/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { Formatter } from '../../formatter';

suite('Formatter Concurrency Test Suite', () => {
	let fixturesDir: string;
	let enginePath: string;

	suiteSetup(() => {
		// Build a tiny cross-platform "fake engine" that mimics a ptop-style
		// external formatter: it receives an input file and an output file,
		// waits a small random delay (to widen any race window), and copies
		// the input content to the output file unchanged.
		fixturesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pascal-formatter-test-'));

		const fakeEngineJs = path.join(fixturesDir, 'fake-engine.js');
		fs.writeFileSync(fakeEngineJs, `
			const fs = require('fs');
			const [, , inFile, outFile] = process.argv;
			const content = fs.readFileSync(inFile, 'utf8');
			setTimeout(() => fs.writeFileSync(outFile, content), Math.random() * 40);
		`);

		// use the current Node executable directly (process.execPath) instead of
		// relying on "node" being resolvable on PATH from the extension host's
		// spawned shell, which is not guaranteed across platforms/CI
		const nodeExecutable = process.execPath;

		if (process.platform === 'win32') {
			enginePath = path.join(fixturesDir, 'fake-engine.cmd');
			fs.writeFileSync(enginePath, `@echo off\r\n"${nodeExecutable}" "${fakeEngineJs}" %*\r\n`);
		} else {
			enginePath = path.join(fixturesDir, 'fake-engine.sh');
			fs.writeFileSync(enginePath, `#!/bin/sh\n"${nodeExecutable}" "${fakeEngineJs}" "$@"\n`);
			fs.chmodSync(enginePath, 0o755);
		}
	});

	suiteTeardown(() => {
		fs.rmSync(fixturesDir, { recursive: true, force: true });
	});

	test('concurrent format() calls do not cross-contaminate content (issue #105)', async function () {
		this.timeout(20000);

		const documentCount = 6;
		const iterations = 3;

		for (let iteration = 0; iteration < iterations; iteration++) {
			const documents = await Promise.all(
				Array.from({ length: documentCount }, (_, i) =>
					vscode.workspace.openTextDocument({
						language: 'pascal',
						content: `unit Doc${iteration}_${i};\n\ninterface\n\nimplementation\n\nend.\n`
					})
				)
			);

			const results = await Promise.all(
				documents.map(document => {
					const formatter = new Formatter(document);
					const fullRange = new vscode.Range(
						0, 0,
						document.lineCount,
						document.lineAt(document.lineCount - 1).range.end.character
					);
					return formatter.format(fullRange, 'ptop', enginePath, '', 0, 0);
				})
			);

			documents.forEach((document, i) => {
				assert.strictEqual(
					results[i],
					document.getText(),
					`Result for document ${i} in iteration ${iteration} was contaminated by another concurrent format() call`
				);
			});
		}
	});
});

suite("Formatter Engine Parameters Test Suite", () => {
	let fixturesDir: string;
	let enginePath: string;
	let configPath: string;

	// engines where "pascal.formatter.engineParameters" is a config file path,
	// and the arguments each one is expected to receive for that path
	const configFileEngines = [
		{ engine: "embarcadero", expectedArgs: (config: string) => ["-config", config] },
		{ engine: "ptop", expectedArgs: (config: string) => ["-c", config] },
		{ engine: "jcf", expectedArgs: (config: string) => [`-config=${config}`] },
		{ engine: "jcf-quadroid", expectedArgs: (config: string) => [`-config=${config}`] }
	];

	suiteSetup(() => {
		// Build a fake engine that writes the arguments it received, as JSON, to
		// the .pas file and to the .out file next to it. format() reads one of them
		// back depending on the engine (in place, -out or JCF's default output),
		// so the test can check how the shell split the command built by format()
		fixturesDir = fs.mkdtempSync(path.join(os.tmpdir(), "pascal-formatter-test-"));
		configPath = path.join(fixturesDir, "config with spaces (x86)", "default.cfg");

		const fakeEngineJs = path.join(fixturesDir, "fake-engine.js");
		fs.writeFileSync(fakeEngineJs, `
			const fs = require("fs");
			const args = process.argv.slice(2);
			const source = args.find(arg => arg.endsWith(".pas"));
			const content = JSON.stringify(args);
			fs.writeFileSync(source, content);
			fs.writeFileSync(source.slice(0, -".pas".length) + ".out", content);
		`);

		const nodeExecutable = process.execPath;

		if (process.platform === "win32") {
			enginePath = path.join(fixturesDir, "fake-engine.cmd");
			fs.writeFileSync(enginePath, `@echo off\r\n"${nodeExecutable}" "${fakeEngineJs}" %*\r\n`);
		} else {
			enginePath = path.join(fixturesDir, "fake-engine.sh");
			fs.writeFileSync(enginePath, `#!/bin/sh\n"${nodeExecutable}" "${fakeEngineJs}" "$@"\n`);
			fs.chmodSync(enginePath, 0o755);
		}
	});

	suiteTeardown(() => {
		fs.rmSync(fixturesDir, { recursive: true, force: true });
	});

	async function formatWithParameters(engine: string, parameters: string): Promise<string[]> {
		const document = await vscode.workspace.openTextDocument({
			language: "pascal",
			content: `unit Test;\n\ninterface\n\nimplementation\n\nend.\n`
		});
		const formatter = new Formatter(document);
		const result = await formatter.format(undefined, engine, enginePath, parameters, 0, 0);
		return JSON.parse(result as string);
	}

	function assertContainsArgs(args: string[], expected: string[]) {
		const start = args.indexOf(expected[0]);
		const actual = start === -1 ? [] : args.slice(start, start + expected.length);
		assert.deepStrictEqual(actual, expected, `Arguments received: ${JSON.stringify(args)}`);
	}

	for (const { engine, expectedArgs } of configFileEngines) {
		test(`${engine}: config file path with spaces is passed as a single argument`, async function () {
			this.timeout(10000);

			const args = await formatWithParameters(engine, configPath);

			assertContainsArgs(args, expectedArgs(configPath));
		});

		test(`${engine}: config file path already wrapped in quotes is not quoted twice`, async function () {
			this.timeout(10000);

			const args = await formatWithParameters(engine, `"${configPath}"`);

			assertContainsArgs(args, expectedArgs(configPath));
		});

		test(`${engine}: spaces around the config file path are ignored`, async function () {
			this.timeout(10000);

			const args = await formatWithParameters(engine, `  ${configPath}  `);

			assertContainsArgs(args, expectedArgs(configPath));
		});

		test(`${engine}: empty parameters do not add a config file argument`, async function () {
			this.timeout(10000);

			const args = await formatWithParameters(engine, "");

			const configFlag = expectedArgs("")[0];
			assert.ok(!args.includes(configFlag) && !args.includes(""), `Arguments received: ${JSON.stringify(args)}`);
		});
	}

	test("pasfmt: parameters are free-form arguments and are not quoted", async function () {
		this.timeout(10000);

		const args = await formatWithParameters("pasfmt", "-C wrap_column=80");

		assert.deepStrictEqual(args.slice(-2), ["-C", "wrap_column=80"]);
	});

	test("pasfmt: empty parameters do not add an argument", async function () {
		this.timeout(10000);

		const args = await formatWithParameters("pasfmt", "");

		assert.deepStrictEqual(args.slice(-2), ["-C", "encoding=utf-8"]);
	});
});

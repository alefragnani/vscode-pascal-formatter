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
					return formatter.format(undefined as unknown as vscode.Range, 'ptop', enginePath, '', 0, 0);
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

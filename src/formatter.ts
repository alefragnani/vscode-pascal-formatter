/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import fs = require('fs');
import cp = require('child_process');
import os = require('os');
import npath = require('path');
import crypto = require('crypto');
import { l10n } from 'vscode';

/*

linux:
    "pascal.formatter.engine": "ptop",
    "pascal.formatter.enginePath": "/usr/bin/ptop",

*/

export class Formatter {

    constructor(private _document: vscode.TextDocument, private _options?: vscode.FormattingOptions) {
        this._options = this._options || {
            insertSpaces: false,
            tabSize: 2
        };

        if (typeof this._options.insertSpaces === 'undefined') {
            this._options.insertSpaces = false;
            this._options.tabSize = 2;
        }

        if (typeof this._options.tabSize !== 'number' || isNaN(this._options.tabSize)) {
            this._options.tabSize = 2;
        }

        this._options.tabSize = Math.max(0, 2);
    }

    public format(range: vscode.Range, engine: string, path: string, parameters: string, indent: number, wrapLineLength: number) {

        return new Promise((resolve, reject) => {

            // entire document - if not range is provided
            range = range || new vscode.Range(
                0, 0,
                this._document.lineCount,
                this._document.lineAt(this._document.lineCount - 1).range.end.character
            );

            const textToFormat = this._document.getText(range);
            // use a unique temp file name per invocation, so concurrent formatting of
            // multiple files (e.g. bulk search and replace with format on save) can't
            // race on a shared temp file and corrupt each other's content
            const uniqueId = crypto.randomUUID();
            const tempFile: string = npath.join(os.tmpdir(), `pascal-formatter-${uniqueId}.pas`);
            let command: string;
            const tempFileOut: string = npath.join(os.tmpdir(), `pascal-formatter-${uniqueId}.out`);
            let readFile: string;
            let configFileParameters = '';

            const workspaceFolder = vscode.workspace.getWorkspaceFolder(this._document.uri);
            const backupFolder = vscode.workspace.workspaceFolders?.[0];
            const cwd = workspaceFolder?.uri?.fsPath || backupFolder?.uri.fsPath;

            fs.writeFileSync(tempFile, textToFormat);

            if (textToFormat) {

                try {

                    if (engine === 'embarcadero') {
                        if (parameters !== '') {
                            configFileParameters = ' -config ' + parameters;
                        }
                        command = "\"" + path + "\" -silent " + configFileParameters + ' "$file" ';
                        command = command.replace('$file', tempFile);
                        readFile = tempFile;
                    } else if (engine === 'ptop') {
                        if (parameters !== '') {
                            configFileParameters = ' -c ' + parameters;
                        }

                        let indentConfig = '';
                        if (indent > 0) {
                            indentConfig = ' -i ' + indent;
                        }

                        let wrapLineLengthConfig = '';
                        if (wrapLineLength > 0) {
                            wrapLineLengthConfig = ' -l ' + wrapLineLength;
                        }

                        command = "\"" + path + "\" " + configFileParameters + indentConfig + wrapLineLengthConfig + ' "$file" "$outfile" ';
                        command = command.replace('$file', tempFile);
                        command = command.replace('$outfile', tempFileOut);
                        readFile = tempFileOut
                    } else if (engine === 'pasfmt') {
                        command = `"${path}" "${tempFile}" -C encoding=utf-8`
                        if (parameters !== '') {
                            command += " " + parameters
                        }
                        readFile = tempFile
                    } else { // jcf
                        if (parameters !== '') {
                            configFileParameters = ' -config=' + parameters;
                        }
                        if (engine === 'jcf-quadroid') {
                            command = "\"" + path + "\" " + configFileParameters + ' -out "$fileout" "$file" ';
                            command = command.replace('$fileout', tempFileOut);
                        } else {
                            command = "\"" + path + "\" " + configFileParameters + ' -y -F "$file" ';
                        }
                        command = command.replace('$file', tempFile);
                        readFile = tempFileOut
                    }

                    const cleanupTempFiles = () => {
                        for (const file of [tempFile, tempFileOut]) {
                            fs.unlink(file, () => { /* best-effort cleanup, ignore errors */ });
                        }
                    };

                    console.log(command);
                    cp.exec(command, { cwd }, function(error, stdout, stderr) {
                        console.log('stdout' + stdout);
                        console.log('error' + error);
                        console.log('stderr' + stderr);
                        try {
                            if (error) {
                                reject(stdout.toString());
                            }
                            else {
                                let formattedXml: string = fs.readFileSync(readFile, 'utf8');
                                // remove UTF-8 BOM
                                if (formattedXml.charCodeAt(0) === 0xfeff) {
                                    formattedXml = formattedXml.substr(1);
                                }
                                resolve(formattedXml);
                            }
                        } catch (readError) {
                            reject(readError.toString());
                        } finally {
                            cleanupTempFiles();
                        }
                    });

                } catch (err) {
                    reject(err.toString());
                }

            }
            // the parser didn't return anything we can use, show an error message and return
            else {
                reject(l10n.t('no text to format'));
            }
        });

    }

}

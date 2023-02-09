/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import fs = require('fs');
import cp = require('child_process');
import os = require('os');
import npath = require('path');
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
            const tempFile: string = npath.join(os.tmpdir(), 'tmp.tmp.pas');
            let command: string;
            const tempFileOut: string = npath.join(os.tmpdir(), 'tmp.tmp.out');
            let readFile: string;
            let configFileParameters = '';

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

                    console.log(command);
                    cp.exec(command, function(error, stdout, stderr) {
                        console.log('stdout' + stdout);
                        console.log('error' + error);
                        console.log('stderr' + stderr);
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

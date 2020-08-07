/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands } from "vscode";
import { Container } from "../container";
import { WhatsNewManager } from "../../vscode-whats-new/src/Manager";
import { WhatsNewPascalFormatterContentProvider } from "./contentProvider";

export function registerWhatsNew() {
    const provider = new WhatsNewPascalFormatterContentProvider();
    const viewer = new WhatsNewManager(Container.context).registerContentProvider("pascal-formatter", provider);
    viewer.showPageInActivation();
    Container.context.subscriptions.push(commands.registerCommand('pascalFormatter.whatsNew', () => viewer.showPage()));
}



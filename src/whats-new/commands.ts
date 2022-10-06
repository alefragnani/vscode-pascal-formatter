/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { commands } from "vscode";
import { Container } from "../container";
import { WhatsNewManager } from "../../vscode-whats-new/src/Manager";
import { PascalFormatterContentProvider, PascalFormatterSocialMediaProvider } from "./contentProvider";

export async function registerWhatsNew() {
    const provider = new PascalFormatterContentProvider();
    const viewer = new WhatsNewManager(Container.context)
        .registerContentProvider("alefragnani", "pascal-formatter", provider)
        .registerSocialMediaProvider(new PascalFormatterSocialMediaProvider())
        
    await viewer.showPageInActivation();

    Container.context.subscriptions.push(commands.registerCommand('pascalFormatter.whatsNew', () => viewer.showPage()));
}



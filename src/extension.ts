// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SchemaParser } from './util/parse-schema';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gqlsort.sort', async () => {
		const editor = vscode.window.activeTextEditor;
		let GQL_REGEX = /[A-z0-9-/].(graphql|gql)/;
		if (editor) {
			var document = editor.document;
			var fileName = document.fileName;
			if (GQL_REGEX.test(fileName)) {
				let schemaParser = new SchemaParser(fileName);
				let sortedData = await schemaParser.parse();
				editor.edit(editBuilder => {
					editBuilder.replace(editor.selection, sortedData)
				})
				vscode.window.showInformationMessage("File sorting completed");
			} else {
				vscode.window.showInformationMessage("Please with a graphQl schema file");
			}
			context.subscriptions.push(disposable);
		}
	});
}



export function deactivate() { }

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SchemaParser } from './util/parse-schema';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const LIMIT = 1;
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gqlsort.sort', async () => {
		console.log("SORTING");
		const editor = vscode.window.activeTextEditor;
		let GQL_REGEX = /[A-z0-9-/].(graphql|gql)/;
		if (editor) {
			var document = editor.document;
			var fileName = document.fileName;
			if (GQL_REGEX.test(fileName)) {
				var sortedData = await initiateSort(fileName,editor,1);
				editor.edit((editBuilder) => {
					try{
						console.log("Replacing");
						editBuilder.replace(editor.selection, sortedData)
					}
					catch(e){
						console.log(e);
						vscode.window.showInformationMessage("Error while sorting schema");
					}
				})
				vscode.window.showInformationMessage("File sorting completed");
				return;
			} else {
				vscode.window.showInformationMessage("Please with a graphQl schema file");
			}
			context.subscriptions.push(disposable);
		}
	});
}


var initiateSort = async (fileName:any, editor:any, times:number) => {
	console.log(times);
	try{
		let schemaParser = new SchemaParser(fileName);
		var sortedData = await schemaParser.parse();
		return sortedData;
	}catch(e){
		console.log("ERRR",e);
		if(e.message.includes("AWSJSON") && times <= LIMIT){
			editor.edit((editBuilder:any) => {
				editBuilder.insert(new vscode.Position(0, 0),`type AWSJSON{
					value: String
				}`)
				setTimeout(function(){
					return initiateSort(fileName,editor,times+1);
				},1000)
			})
		}else{
			throw e;
		}
	}
}


export function deactivate() { }

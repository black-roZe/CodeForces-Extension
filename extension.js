const vscode = require('vscode');
const puppeteer=require('puppeteer');
const createWebViewForProblem=require('./Functions/createWebViewForProbelem');
const createTerminalForTesting=require('./Functions/createTerminalForTesting');
const runSampleTests=require('./Functions/runSampleTests')
const MyTreeDataProvider=require('./TreeView/TreeDataProvider')
const problemsTags=require('./TreeViewAPI/problemsTags')
const QuestionIDTreeProvider=require('./TreeViewAPI/questionByID')
const createWebViewFromTreeView=require('./Functions/createWebViewFromTreeView')
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	console.log("yo")
	console.log('Congratulations, your extension "codeforces-helper" is now active!');
	
	const treeView=vscode.window.createTreeView('tags',{
		treeDataProvider: new MyTreeDataProvider.MyTreeDataProvider()
	});

	const questionIDTreeDataProvider=vscode.window.createTreeView('search',{
		treeDataProvider: new QuestionIDTreeProvider.QuestionIDTreeProvider()
	})
	
	//console.log(wow.allTags);
	let disposable = vscode.commands.registerCommand('codeforces-helper.start', async function () {
		vscode.window.showInformationMessage('Hello World from Codeforces-Helper!');
		
	});

	let showCodeForceProblemInWebview = vscode.commands.registerCommand('codeforces-extension.showWebview',async () => {
		createWebViewForProblem.createWebViewForProblem();
	});


	const runFile=vscode.commands.registerCommand('codeforces-extension.makeTerminal',async ()=>{
		createTerminalForTesting.createTerminalForTesting();
	});

	const webViewFromTreeVIew=vscode.commands.registerCommand('codeforces-extension.treeWebView',async ()=>{
		//console.log("yeeeeep");
		//console.log(treeView.selection);
		const selectedItem=treeView.selection[0];
		createWebViewFromTreeView.createWebViewFromTreeView(selectedItem.label.substr(0,5));
		
	});


	const runSampleTestCases=vscode.commands.registerCommand('codeforces-extension.sampleTests',async ()=>{

		runSampleTests.runSampleTests();

	})
	
	context.subscriptions.push(showCodeForceProblemInWebview);
	context.subscriptions.push(runFile);
	context.subscriptions.push(runSampleTestCases);
	context.subscriptions.push(webViewFromTreeVIew)
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

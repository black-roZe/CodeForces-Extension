const vscode=require('vscode');
const getQuestion=require('./getQuestion');
const getURLFromInputBox=require('./getURLFromInputBox');
const HTMLForWebView=require('./HTMLForWebView');

/**
 * @param {vscode.ExtensionContext} context
 */

const createWebViewForProblem=async ()=>{
    
    let url=await getURLFromInputBox.getURLFromInputBox();
    
    let problemStatement=await getQuestion.fetchProblemStatement(url[0]);
    
    let problemHTML=await HTMLForWebView.makeWebView(problemStatement[0])
    

    let currentPanel=vscode.WebviewPanel;
    
    currentPanel = vscode.window.createWebviewPanel(
        'webview', 
        url[1],
        vscode.ViewColumn.Two, 
        {
            enableScripts: true,
            //localResourceRoots: [vscode.Uri.joinPath(context.extensionPath,'Functions','WebView')],
        }
    );

    currentPanel.webview.html=problemHTML;
    
    currentPanel.onDidDispose(()=>{
		currentPanel=null;
        //let index=webviewArray.indexOf(url[1])
	},null,context.subscriptions);
}

exports.createWebViewForProblem=createWebViewForProblem;

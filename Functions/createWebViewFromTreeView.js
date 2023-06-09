const vscode=require('vscode');
const getQuestion=require('./getQuestion');
const getURLFromInputBox=require('./getURLFromInputBox');
const HTMLForWebView=require('./HTMLForWebView');

/**
 * @param {vscode.ExtensionContext} context
 */

const createWebViewFromTreeView=async (data)=>{
    
    const url=`https://codeforces.com/problemset/problem/${data.substring(0,data.length-1)}/${data.substring(data.length-1)}`
    
    let problemStatement=await getQuestion.fetchProblemStatement(url);
    
    let problemHTML=await HTMLForWebView.makeWebView(problemStatement[0])
    

    let currentPanel=vscode.WebviewPanel;
    
    currentPanel = vscode.window.createWebviewPanel(
        'webview', 
        data,
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

module.exports={
    createWebViewFromTreeView
}

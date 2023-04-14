const vscode = require('vscode');
const puppeteer=require('puppeteer');
const CFWebView=require('./Functions/HTMLForWebView')


let currentPanel=vscode.WebviewPanel;
let extensionTerminal=null;
let url;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "check" is now active!');

	let showCodeForceProblemInWebview = vscode.commands.registerCommand('codeforces-extension.showWebview',async () => {
		
		
		if(currentPanel)
		{
			currentPanel.reveal(vscode.ViewColumn.Two);
		}
		else
		{
			
			await vscode.window.showInputBox()
			.then((data)=>{
				if(data.length<6)
				{
					url=`https://codeforces.com/problemset/problem/${data.substring(0,data.length-1)}/${data.substring(data.length-1)}`
				}
				else
				{
					url=data;
				}
			});
			currentPanel = vscode.window.createWebviewPanel(
				'webview', 
				'Question',
				vscode.ViewColumn.Two, 
				{
					enableScripts: true,
					//localResourceRoots: [vscode.Uri.joinPath(context.extensionPath,'Functions','WebView')],
				}
			);
		
			// const onDiskScriptPath=vscode.Uri.joinPath(context.extensionPath,'Functions','WebView','script.js');
			// const scriptSrc=currentPanel.webview.asWebviewUri(onDiskScriptPath)

			// const onDiskStylePath=vscode.Uri.joinPath(context.extensionPath,'Functions','WebView','style.css');
			// const styleSrc=currentPanel.webview.asWebviewUri(onDiskStylePath)

			CFWebView.makeWebView(url)
			.then(response=>currentPanel.webview.html=response);
		}

		currentPanel.onDidDispose(()=>{
			currentPanel=null;
		},null,context.subscriptions);
	});


	const runFile=vscode.commands.registerCommand('codeforces-extension.makeTerminal',async ()=>{
		let shellPath=await getCPlusPlusFileUri();
		await createTerminalForTesting();
		
		extensionTerminal.sendText(`cd ${shellPath}`);
	});


	const runSampleTestCases=vscode.commands.registerCommand('codeforces-extension.sampleTests',async ()=>{

		let sampleTestArray=await makeSampleInputArray(url);
		let shellPath=await getCPlusPlusFileUri();
		for(let i=0;i<sampleTestArray.length;i++)
		{
			extensionTerminal.sendText(`cd ${shellPath} && g++ test.cpp && ./a.out`)
			console.log(Array.isArray(sampleTestArray[i]))
			if(Array.isArray(sampleTestArray[i]))
			{
				for(let j=0;j<sampleTestArray[i].length;j++)
				{
					extensionTerminal.sendText(sampleTestArray[i][j]);
				}
			}
			else
			{
				extensionTerminal.sendText(sampleTestArray[i]);
			}
			//extensionTerminal.sendText(sampleTestArray[i]);
		}

	})
	
	context.subscriptions.push(showCodeForceProblemInWebview);
	context.subscriptions.push(runFile);
	context.subscriptions.push(runSampleTestCases);
	
	
}



/* ****************************x-x-x-x--x-x-x--x-x--x-x--x-x--x-x--x--x-x--x-x--x-************************** */


const checkTerminal=async ()=>{
    if(vscode.window.terminals.length===0)
    {
        return null;
    }
    else
    {
        let len=vscode.window.terminals.length;
        for(let i=0;i<len;i++)
        {
            if(vscode.window.terminals[i].name==='CodeForces-Test')
            {
                return vscode.window.terminals[i];
            }
        }
    }
    return null;
}

const createTerminalForTesting=async ()=>{
	
	
	extensionTerminal=await checkTerminal();

    if(!extensionTerminal)
    {
		
        extensionTerminal=await vscode.window.createTerminal('CodeForces-Test');
    }
    
    extensionTerminal.show();
}

async function getCPlusPlusFileUri() {
	const editor = vscode.window.activeTextEditor;
	if (editor && editor.document.languageId === 'cpp') {

		let folderPath=await findFolderPath(editor.document.uri.path);

		console.log(folderPath)
		return folderPath;
	} else {
	  vscode.window.showErrorMessage('No open C++ file in the active editor.');
	  return undefined;
	}
  }

async function findFolderPath(shellPath){
	let temp=0;
	for(let i=0;i<shellPath.length;i++)
	{
		if(shellPath[i]==='/')
			temp++;
	}
	let flag=0;
	let folderPath="";
	for(let i=0;i<shellPath.length;i++)
	{
		if(shellPath[i]==='/')
			flag++;
		if(flag===temp)
		{
			break;
		}
		else
			folderPath+=shellPath[i];
	}
	return folderPath;
}

/* ****************************x-x-x-x--x-x-x--x-x--x-x--x-x--x-x--x--x-x--x-x--x-************************** */



/* ******************************x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x*************************** */


const makeSampleInputArray=async (url)=>{
	
	let sampleInputArray=[];
	console.log("hello");
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
  
	await page.waitForSelector('div.input > pre');

	sampleInputArray=await page.$$eval('div.input > pre',sampleInputs => sampleInputs.map(div => {
		console.log(div.children);
		if(div.childElementCount>1)
		{
			let temp=[];
			let children=div.children;
			for(let i=0;i<children.length;i++)
			{
				temp.push(children[i].textContent);
			}
			console.log(temp);
			return temp;
		}
		else
		{
			console.log(div.textContent);
			return div.textContent;
		}
	}))
	console.log(sampleInputArray);
	return sampleInputArray;
}


/* ******************************x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x*************************** */
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

const vscode=require('vscode');
const findFolderPath=require('./findFolderPath');

async function getCPlusPlusFileUri() {
	const editor = vscode.window.activeTextEditor;
	if (editor && editor.document.languageId === 'cpp') {

        //console.log(editor.document.uri.path)
		let folderPath=await findFolderPath.findFolderPath(editor.document.uri.path);

		//console.log(folderPath)
		return folderPath;
	} else {
	  vscode.window.showErrorMessage('No open C++ file in the active editor.');
	  return undefined;
	}
  }

  exports.getCPlusPlusFileUri=getCPlusPlusFileUri;
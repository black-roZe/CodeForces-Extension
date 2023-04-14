const getQuestion=require('./getQuestion')

const makeWebView=async (url)=>{

	let data=await getQuestion.fetchProblemStatement(url);

	// const scriptPathOnDisk=vscode.Uri.joinPath(vscode.ExtensionContext.extensionUri,'media','script.js');
	// const scriptUri=vscode.Webview.asWebviewUri(scriptPathOnDisk);

	// const stylesPathMainPath = vscode.Uri.joinPath(vscode.ExtensionContext.extensionUri, 'media', 'style.css');
	// const stylesMainUri = vscode.Webview.asWebviewUri(stylesPathMainPath);

	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link href="" rel="stylesheet">
		<style>
		*{
			font-size:16px;
		}
		.header{
			margin-left:auto;
			margin-right:auto;
			text-align:center;
		}
		.title{
			font-size:30px;
			margin-top:4px;
			margin-bottom:4px;
		}
		.time-limit{
			font-size:10px;
			margin-top:4px;
			margin-bottom:4px;
		}
		.memory-limit{
			font-size:10px;
			margin-top:4px;
			margin-bottom:4px;
		}
		.input-type{
			font-size:10px;
			margin-top:4px;
			margin-bottom:4px;
		}
		.output-type{
			font-size:10px;
			margin-top:4px;
			margin-bottom:4px;
		}
		</style>
		<title>Cat Coding</title>
	</head>
		<body>
			helo there
			<script defer src=""></script>
		</body>
	</html>`
}
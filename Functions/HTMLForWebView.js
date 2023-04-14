const fetchProblem=require('./getQuestion');

const makeWebView=async (url)=>{

	let data=await fetchProblem.fetchProblemStatement(url);

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
            font-size: 10px;
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
            font-family: monospace;
			margin-top:4px;
			margin-bottom:4px;
		}
		.memory-limit{
            font-family: monospace;
			margin-top:4px;
			margin-bottom:4px;
		}
		.input-type{
            font-family: monospace;
            margin-top:4px;
			margin-bottom:4px;
		}
		.output-type{
            font-family: monospace;
			margin-top:4px;
			margin-bottom:4px;
		}
		</style>
		<title>Cat Coding</title>
	</head>
		<body>
			${data}
			<script defer src=""></script>
		</body>
	</html>`
}

exports.makeWebView=makeWebView;

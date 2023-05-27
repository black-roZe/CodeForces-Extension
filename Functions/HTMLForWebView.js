const fetchProblem=require('./getQuestion');

const makeWebView=async (html)=>{

	//let data=await fetchProblem.fetchProblemStatement(url);

	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link href="" rel="stylesheet">
		<style>
		*{
			font-size:18px;
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
            
			margin-top:4px;
			margin-bottom:4px;
		}
		.memory-limit{
            
			margin-top:4px;
			margin-bottom:4px;
		}
		.input-type{
            
            margin-top:4px;
			margin-bottom:4px;
		}
		.output-type{
            
			margin-top:4px;
			margin-bottom:4px;
		}
		
		</style>
		<title>Cat Coding</title>
	</head>
		<body>
			${html}
			<script defer src=""></script>
		</body>
	</html>`
}

exports.makeWebView=makeWebView;

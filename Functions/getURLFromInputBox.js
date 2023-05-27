const vscode =require('vscode');

const getURLFromInputBox= async ()=>{
    let url,problemNumber;
    //console.log("i am in input box");
    await vscode.window.showInputBox()
	    .then((data)=>{
			if(data.length<6)
			{
				url=`https://codeforces.com/problemset/problem/${data.substring(0,data.length-1)}/${data.substring(data.length-1)}`
                problemNumber=data;
			}
			else
			{
				url=data;
			}
		});
        //console.log(url);
        
    return [url,problemNumber];
}

exports.getURLFromInputBox=getURLFromInputBox;
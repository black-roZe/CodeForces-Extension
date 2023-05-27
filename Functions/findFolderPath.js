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

exports.findFolderPath=findFolderPath;
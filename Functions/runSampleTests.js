const vscode=require('vscode');
const sampleInputArray=require('./getQuestion')
const getCPlusPlusFileUri=require('./getCPlusPlusFileUri');
const createTerminalForTesting=require('./createTerminalForTesting');
const getQuestion=require('./getQuestion');

const runSampleTests=async ()=>{

	let sampleInput=getQuestion.getSampleTests();
	//console.log("in run sample tests");
	console.log(sampleInput);
    let extensionTerminal=await createTerminalForTesting.createTerminalForTesting();
    let shellPath=await getCPlusPlusFileUri.getCPlusPlusFileUri();
		for(let i=0;i<sampleInput.length;i++)
		{
			extensionTerminal.sendText(`cd ${shellPath} && g++ test.cpp && ./a.out`)
			//console.log(Array.isArray(sampleInputArray[i]))
			if(Array.isArray(sampleInput[i]))
			{
				for(let j=0;j<sampleInput[i].length;j++)
				{
					extensionTerminal.sendText(sampleInput[i][j]);
				}
			}
			else
			{
				extensionTerminal.sendText(sampleInput[i]);
			}
			//extensionTerminal.sendText(sampleTestArray[i]);
		}
}

exports.runSampleTests=runSampleTests;
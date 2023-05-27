const vscode=require('vscode');
const checkTerminal=require('./checkTerminal');
const getCPlusPlusFileUri=require('./getCPlusPlusFileUri');

let extensionTerminal=null;

const createTerminalForTesting=async ()=>{
	
    let shellPath=await getCPlusPlusFileUri.getCPlusPlusFileUri();
	
	extensionTerminal=await checkTerminal.checkTerminal();

    if(!extensionTerminal)
    {
        extensionTerminal=await vscode.window.createTerminal('CodeForces-Test');
    }
    
    extensionTerminal.show();

    extensionTerminal.sendText(`cd ${shellPath}`);
    return extensionTerminal;
}

exports.createTerminalForTesting=createTerminalForTesting;
exports.extensionTerminal=extensionTerminal;
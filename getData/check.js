const vscode=require('vscode');


let extesnionTerminal=null;

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

const createTerminal=async ()=>{
    extesnionTerminal=await checkTerminal();

    if(!extesnionTerminal)
    {
        extesnionTerminal=await vscode.window.createTerminal('CodeForces-Test');
    }
    else
    {
        await extesnionTerminal.show();
    }
}

const runFile=async ()=>{
    await createTerminal();

    extesnionTerminal.sendText("echo 'Hello world!");
}

runFile();
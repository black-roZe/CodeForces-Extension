const vscode =require('vscode');

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

exports.checkTerminal=checkTerminal;
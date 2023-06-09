const vscode=require('vscode');

class MyTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
      super(label, collapsibleState);
      this.label = label;
      this.collapsibleState = collapsibleState;
      this.inputBox = vscode.window.createInputBox();
      this.inputBox.placeholder = 'Enter ID';
    }
  }

  class QuestionIDTreeProvider
  {
      constructor(){
          
      }
  
        getTreeItem(element){
            return element
        }

        async getChildren(element){
            return Promise.resolve([new MyTreeItem('Search with question ID or URL',vscode.TreeItemCollapsibleState.None)]);
        }

  }
  
  module.exports={
      QuestionIDTreeProvider
  }
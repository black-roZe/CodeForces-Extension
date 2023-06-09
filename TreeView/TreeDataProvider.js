const vscode=require('vscode')
const TreeViewApi=require('../TreeViewAPI/problemsTags')

class element extends vscode.TreeItem{
    constructor(label,collapsibleState){
        super(label,collapsibleState)
        this.label=label;
        this.collapsibleState=collapsibleState;
    }
}

class MyTreeDataProvider
{
    constructor(){
        
    }

        getTreeItem(element){
            return element
        }

        async getChildren(element){
            
            const questions=(await TreeViewApi.sortQuestionsByTags()).allQuestions;
            const allTags=(await TreeViewApi.sortQuestionsByTags()).allTags;
            if(element){
                const questionsByTag=questions[element.label].map((question)=>{
                    return this.makeTreeViewQuestion(question)
                })
                return Promise.resolve(questionsByTag);
            }
            else{
                const tags=allTags.map((tag)=>{
                    return this.makeTreeViewTag(tag); 
                })
                return Promise.resolve(tags);
            } 
            
        }

        makeTreeViewQuestion(question){
            const treeItem= new element(`${question.QuestionNo} ${question.Name} - Rating:${question.Rating}`,vscode.TreeItemCollapsibleState.None)
            return treeItem;
        }

        makeTreeViewTag(tag){
            return new element(tag,vscode.TreeItemCollapsibleState.Collapsed)
        }
    
}

module.exports={
    MyTreeDataProvider
}


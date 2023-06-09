const vscode=require('vscode');
const CodeforcesAPI=require('../CodeforcesAPI/CodeforcesAPI')

const sortQuestionsByTags=async ()=>{
    try {
        //console.log("hello")
        const questions=await CodeforcesAPI.getQuestions();
        const allQuestions={}
        const allTags=[]
        await questions.map((question)=>{
            const questionsInfo={
                QuestionNo:question.contestId+question.index,
                Name:question.name,
                Rating:question.rating
            }
            question.tags.map((tag)=>{
                if(!allQuestions[tag]){
                    allQuestions[tag]=[]
                }
                if(!allTags.includes(tag)){
                    allTags.push(tag);
                }
                allQuestions[tag].push(questionsInfo);
            })
        })
        allTags.sort
        // console.log(allQuestions);
        // console.log(allTags);
        return {allQuestions,allTags};
    } 
    catch (error) {
        vscode.window.showErrorMessage(error);
    }
}

module.exports={
    sortQuestionsByTags
}
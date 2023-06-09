const vscode=require('vscode');
const axios=require('axios')

const getQuestions=async ()=>{
    try {
        //console.log('wow');
        const questions=await axios.get('https://codeforces.com/api/problemset.problems');
        //console.log("ezzz")
        const questionsJSON=await questions.data;

        //console.log(questionsJSON.result.problems);
        return questionsJSON.result.problems;
    } 
    catch (error) {
        vscode.window.showErrorMessage(error);
        console.log(error)
    }
    
}

const getContests=async ()=>{
    try {
        const contests=await axios.get(' https://codeforces.com/api/contest.list?gym=false');
        const contestJSON=await contests.data;
        return contestJSON.result;
    } 
    catch (error) {
        vscode.window.showErrorMessage(error);
    }
}

getQuestions();

module.exports={
    getQuestions,
    getContests
}

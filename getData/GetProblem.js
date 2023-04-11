const puppeteer=require('puppeteer');

const getProblem=async ()=>{
   const browser=await puppeteer.launch({
    headless:false
   });

   const page=await browser.newPage();
   await page.goto("https://codeforces.com/problemset/problem/1815/A");

   let problem={
        title:"ABC",
        timeLimit:1,
        memoryLimit:512,
        problemStatement:"",
        input:"",
        output:"",
        sampleInput:"",
        sampleOutput:""
   }
   
   problem.title=await page.evaluate(()=>document.querySelector("div.header > div.title").innerText);
   //console.log(problem.title);
   problem.timeLimit=await page.evaluate(()=>document.querySelector("div.header > div.time-limit").innerText);
   problem.memoryLimit=await page.evaluate(()=>document.querySelector("div.header > div.memory-limit").innerText);

   console.log(problem.title);
   console.log(problem.timeLimit);
   console.log(problem.memoryLimit);

   let problemStatementList=await page.evaluate(()=>document.querySelectorAll("#pageContent > div.problemindexholder > div.ttypography > div > div:nth-child(2) p"));
   
   for(let i=0;i<problemStatementList.length;i++)
   {
        problem.problemStatement+=problemStatementList[i].textContent;
   }
   

   //let problemStatementList=await page.evaluate(()=>document.querySelectorAll("div.problem-statement"));
   console.log(problem.problemStatement);
   
//    problemStatementList.forEach((element)=>{
//         if(element.className==="")
//         {
//             element.ClassName="wow";
//         }
//    })

//    problem.problemStatement=await page.evaluate(()=>document.querySelectorAll("div.wow")).innerText;
   
    console.log(problem.problemStatement);
}

getProblem();
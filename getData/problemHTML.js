//import fetchProblemStatement from "./test";
const test=require("./test");


const returnHTML=async(url)=>{
    let data=await test.fetchProblemStatement(url);

    return `<!DOCTYPE html>
                <html>
                    <body>
                    ${data}
                    </body>
                </html>`
}

returnHTML("https://codeforces.com/problemset/problem/1815/A");

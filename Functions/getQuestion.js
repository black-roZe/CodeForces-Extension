const { default: puppeteer } = require("puppeteer");

let sampleInputArray=[];
async function fetchProblemStatement(url) {
	
	const browser = await puppeteer.launch({
		headless:"new"
	}
	);
	const page = await browser.newPage();
	await page.goto(url);
  
	await page.waitForSelector('.problem-statement');
	await page.waitForSelector('div.input > pre');

	sampleInputArray=await page.$$eval('div.input > pre',sampleInputs => sampleInputs.map(div => {
		console.log(div.children);
		if(div.childElementCount>1)
		{
			let temp=[];
			let children=div.children;
			for(let i=0;i<children.length;i++)
			{
				temp.push(children[i].textContent);
			}
			console.log(temp);
			return temp;
		}
		else
		{
			console.log(div.textContent);
			return div.textContent;
		}
	}))
  
	const problemStatementElement = await page.$('.problem-statement');
	const problemStatementHtml = await page.evaluate(el => el.innerHTML, problemStatementElement);
  
	await browser.close();
  
	//console.log(problemStatementHtml);
	//console.log(sampleInputArray);
	return [problemStatementHtml,sampleInputArray];
  
}	  

const getSampleTests=()=>sampleInputArray;


exports.fetchProblemStatement=fetchProblemStatement;
exports.getSampleTests=getSampleTests;
exports.sampleInputArray=sampleInputArray;
const { default: puppeteer } = require("puppeteer");


async function fetchProblemStatement(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
  
	await page.waitForSelector('.problem-statement');
  
	const problemStatementElement = await page.$('.problem-statement');
	const problemStatementHtml = await page.evaluate(el => el.innerHTML, problemStatementElement);
  
	await browser.close();
  
	//console.log(problemStatementHtml);
	return problemStatementHtml;
  
}	  


exports.fetchProblemStatement=fetchProblemStatement;
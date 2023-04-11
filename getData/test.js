const puppeteer = require('puppeteer');

async function fetchProblemStatement(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Wait for the problem statement to load
  await page.waitForSelector('.problem-statement');

  // Get the problem statement element and extract its HTML
  const problemStatementElement = await page.$('.problem-statement');
  const problemStatementHtml = await page.evaluate(el => el.innerHTML.toString(), problemStatementElement);

  // Close the browser
  await browser.close();

  // Return the problem statement HTML
  //console.log(problemStatementHtml);

    return `<!DOCTYPE html>
                <html>
                    <body>
                    ${problemStatementHtml}
                    </body>
                </html>`
}

fetchProblemStatement("https://codeforces.com/problemset/problem/1815/A").then(response=>console.log(response));
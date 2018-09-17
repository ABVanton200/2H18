const puppeteer = require('puppeteer');
let page;
let browser;

const cases = [
    {s: 'abc'}, 
    {s: 'zyx'},
];

const URL = 'https://kodaktor.ru/g/autocase';  

(async () => {
  browser = await puppeteer.launch({
    waitUntil: 'domcontentloaded',
    headless: false,
    slowMo: 30,
    devtools: false,
  });
  page = await browser.newPage();

  for (let test of cases) {
        await page.goto(URL);  
        page.evaluate(s => document.querySelector('#inp').value = s, test.s);
        await page.$eval('#button_do', el => el.click());

  		console.log((await page.$eval('#ans', el => el.value)));
  };
  await browser.close();  
})();
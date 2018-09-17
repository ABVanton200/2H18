const puppeteer = require('puppeteer');
const faker = require('faker');

let page;
let browser;
const [ width, height] = [600, 350];
before(async () => {
  browser = await puppeteer.launch({
    waitUntil: 'domcontentloaded',
    headless: false,
    slowMo: 30,
    devtools: false,
    args: [`--window-size=${width},${height}`, `--window-position=30,160`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

// after(async () => { await browser.close(); }); // в демонстрационных целях закомментить чтобы окно осталось

const lead = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.lorem.sentence()
};

const URL = 'https://kodaktor.ru/g/puppetform';


describe('Contact form', () => {
  it('lead can submit a contact request', async () => {
    await page.goto(URL);
    await page.waitForSelector('[data-test=contact-form]');
    await page.click('input[name=name]');
    await page.type('input[name=name]', lead.name);
    await page.click('input[name=email]');
    await page.type('input[name=email]', lead.email);
    await page.click('input[name=tel]');
    await page.type('input[name=tel]', lead.phone);
    await page.click('textarea[name=message]');
    await page.type('textarea[name=message]', lead.message);
    await page.click('input[type=checkbox]');
    await page.click('button[type=submit]');
    await page.waitForSelector('.modal');    
  }).timeout(16000);
})

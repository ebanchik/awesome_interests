const fs = require('fs');
const puppeteer = require('puppeteer');
// puppeteer.launch(headless: "new")

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto('https://www.mybackrlyhurts.com/about-4/');

  // await page.screenshot({ path: 'example.png', fullPage: true});
  // await page.pdf({ path: 'example.pdf', format: 'A4'});

  const html = await page.content();
  console.log(html);
  
  const title = await page.evaluate(() => document.title);
  console.log(title);

  const text = await page.evaluate(() => document.body.innerText);  
  console.log(text);

  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
  console.log(links)

  // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
  // console.log(links)

  fs.writeFileSync('home_text.txt', text);

  await browser.close();
}

run();
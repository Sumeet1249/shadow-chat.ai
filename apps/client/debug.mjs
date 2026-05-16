import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE LOG ERROR:', msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    console.log('GOTO ERROR:', e.toString());
  }
  
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  fs.writeFileSync('dom.html', bodyHTML);
  console.log('BODY LENGTH:', bodyHTML.length);
  
  await browser.close();
})();

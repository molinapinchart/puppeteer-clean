const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  const divSelector = process.argv[3];

  if (!url || !divSelector) {
    console.error('Usage: node getDivText.js <url> <divSelector>');
    process.exitCode = 1;
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

    const result = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText : 'Div not found';
    }, divSelector);

    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();

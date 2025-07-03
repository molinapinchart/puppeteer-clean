const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/div-text', async (req, res) => {
  const { url, selector } = req.query;

  if (!url || !selector) {
    return res.status(400).json({ error: 'Missing url or selector parameter' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

    const result = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.innerText : null;
    }, selector);

    if (result) {
      res.json({ text: result });
    } else {
      res.status(404).json({ error: 'Div not found' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;


const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/getDivText', async (req, res) => {
  const { url, div } = req.query;

  if (!url || !div) {
    return res.status(400).json({ error: 'Missing url or div parameter' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

    const text = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText : null;
    }, div);

    if (!text) {
      return res.status(404).json({ error: 'Div not found' });
    }

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;

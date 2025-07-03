const router = require('express').Router();
const puppeteer = require('puppeteer');

router.get('/', async (req, res) => {
  const { url, text = '' } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const content = await page.content();
    await browser.close();

    res.json({ found: text ? content.includes(text) : content.length > 0 });
  } catch (err) {
    if (browser) await browser.close();
    console.error('Error in /check:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

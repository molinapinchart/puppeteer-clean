const puppeteer = require('puppeteer');
const router = require('express').Router();

router.get('/screenshot', async (req, res) => {
  const { url, full = 'false' } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

    const buffer = await page.screenshot({ fullPage: full === 'true' });
    res.type('image/png').send(buffer);

  } catch (err) {
    console.error('Error in /screenshot:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;

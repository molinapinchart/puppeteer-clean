const router = require('express').Router();
const puppeteer = require('puppeteer');

router.get('/headings', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });

    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => ({ tag: h.tagName, text: h.innerText.trim() }))
    );

    res.json({ headings });
  } catch (err) {
    console.error('Error in /headings:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;

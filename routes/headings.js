const puppeteer = require('puppeteer');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const headings = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .map(h => ({ tag: h.tagName, text: h.innerText.trim() }))
  );

  await browser.close();
  res.json({ headings });
});

module.exports = router;
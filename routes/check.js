const puppeteer = require('puppeteer');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { url, text = '' } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const content = await page.content();
  await browser.close();

  res.json({ found: text ? content.includes(text) : content.length > 0 });
});

module.exports = router;
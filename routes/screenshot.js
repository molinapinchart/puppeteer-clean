const puppeteer = require('puppeteer');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { url, full = 'false' } = req.query;
  if (!url) return res.status(400).send('url requerido');

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const buffer = await page.screenshot({ fullPage: full === 'true' });
  await browser.close();

  res.type('image/png').send(buffer);
});

module.exports = router;
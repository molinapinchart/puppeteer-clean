const puppeteer = require('puppeteer');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url requerido' });

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector("meta[name='description']")?.content || ''
  }));

  await browser.close();
  res.json(data);
});

module.exports = router;
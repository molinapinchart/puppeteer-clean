import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;

app.get('/check', async (req, res) => {
  const { url, text } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const pageContent = await page.content();
    const normalizedText = (text || '').toLowerCase();
    const normalizedContent = pageContent.toLowerCase();
    const found = normalizedContent.includes(normalizedText);

    await browser.close();
    res.json({ found });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

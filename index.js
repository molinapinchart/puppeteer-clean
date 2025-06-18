import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;

app.get('/check', async (req, res) => {
  const { url, text } = req.query;

  if (!url || !text) {
    return res.status(400).json({ error: 'Missing url or text parameter' });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    const pageContent = await page.content();
    const found = pageContent.includes(text);

    await browser.close();

    return res.json({ url, text, found });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/check', async (req, res) => {
  const url = req.query.url;
  const text = (req.query.text || '').trim();

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForSelector('body', { timeout: 10000 });

    const bodyText = await page.evaluate(() => {
      return document.body.innerText.replace(/\s+/g, ' ').trim();
    });

    const found = text
      ? bodyText.toLowerCase().includes(text.toLowerCase())
      : !!bodyText;

    res.json({ url, found });
  } catch (error) {
    console.error('Error during check:', error.message);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.get('/', (req, res) => {
  res.send('Puppeteer checker is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

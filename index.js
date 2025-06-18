import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;

app.get('/check', async (req, res) => {
  const { url, text } = req.query;

  if (!url || !text) {
    return res.status(400).json({ error: 'Missing url or text parameter' });
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Simula navegador real
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'es-CL,es;q=0.9,en;q=0.8'
    });

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    const bodyText = await page.evaluate(() => document.body.innerText);
    const found = bodyText.includes(text);


    await browser.close();

    res.json({ url, text, found });

  } catch (error) {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }

    console.error(`Error procesando ${url}:`, error.message);
    res.status(500).json({ error: error.message || 'Unexpected error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

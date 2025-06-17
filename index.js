import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.json());

async function checkUrl(url, text) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const html = await page.content();
  await browser.close();

  return html.includes(text);
}

app.post('/check', async (req, res) => {
  try {
    const { url, text } = req.body;
    if (!url || !text) {
      return res.status(400).json({ error: 'Missing url or text' });
    }
    const found = await checkUrl(url, text);
    res.json({ url, text, found });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Microservicio activo en puerto ${port}`));

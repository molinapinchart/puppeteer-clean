const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/check', async (req, res) => {
  const { url, text } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Esperar el body o una clase específica si lo deseas
    await page.waitForSelector('body');

    // Extraer innerHTML en vez de innerText
    const html = await page.evaluate(() => document.body.innerHTML);

    const normalizedHtml = html.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedText = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();

    const found = normalizedHtml.includes(normalizedText);

    if (!found) {
      console.warn(`Texto NO encontrado: [${normalizedText}]`);
    }

    res.json({ found });
  } catch (error) {
    console.error('Error al procesar la URL:', error.message);
    res.status(500).json({ error: 'Failed to check content', details: error.message });
  } finally {
    await browser.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

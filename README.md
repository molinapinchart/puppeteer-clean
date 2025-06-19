
# 🕵️‍♂️ Puppeteer SEO Explorer API

Este proyecto es un microservicio backend construido con Node.js, Express y Puppeteer, pensado para integrarse con herramientas como n8n, Postman u otros entornos de automatización. Su objetivo principal es ofrecer una API robusta para análisis SEO mediante la exploración de sitios web en tiempo real.

---

## 🚀 ¿Qué hace esta API?

- ✅ Verifica si un texto específico aparece en una URL renderizada con JavaScript.
- 🌍 Soporta múltiples países e idiomas (ideal para sitios regionalizados).
- 🖥️ Renderiza el contenido del DOM, incluso si requiere ejecución de JS (ideal para SPAs).
- 🧩 Diseñado para integrarse con flujos de trabajo automatizados como n8n, Zapier, Make, etc.

---

## 🧪 Endpoints disponibles

### `GET /check`
Analiza una URL para ver si contiene cierto texto.

#### Parámetros:
- `url`: URL completa a revisar. Ej: `https://example.com/es/static/nosotros`
- `text`: Texto opcional que deseas buscar dentro del contenido renderizado.

#### Ejemplo de uso:
```bash
curl "https://your-service-url/check?url=https://apprecio.cl/es_cl/static/nosotros&text=Managing%20Director"
```

#### Respuesta:
```json
{
  "found": true,
  "body": "<html>...</html>"
}
```

---

## ⚙️ Instalación local

```bash
git clone https://github.com/tuusuario/puppeteer-clean.git
cd puppeteer-clean
npm install
```

### 🧪 Ejecutar en modo desarrollo
```bash
npm run dev
```

### 🛠️ Construir para producción
```bash
npm start
```

---

## 🧩 Uso sugerido en n8n

1. `formTrigger`: recibe la ruta parcial y texto a verificar.
2. `code`: genera URLs por país e idioma.
3. `httpRequest`: llama a esta API (`/check`) para cada URL.
4. `code`: combina la respuesta con los metadatos originales.
5. `set`: organiza los campos.
6. `Google Sheets`: guarda el resultado en un dashboard.

---

## 🛡️ Requisitos

- Node.js v18 o superior
- Railway, Render o cualquier PaaS que soporte Puppeteer con Chromium

---

## 🧠 Ideas para futuras funciones

- 📸 Captura de screenshots para cada URL
- ⏱️ Tiempo de carga por URL
- 🕷️ Conteo de links internos y externos
- 🧼 Limpieza de HTML (solo texto)
- 🧱 Verificación de metadatos SEO (`<title>`, `<meta name="description">`)
- 📊 Integración con Lighthouse

---

## 📄 Licencia

MIT – Libre uso y distribución.

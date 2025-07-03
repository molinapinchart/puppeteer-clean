const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Montar las rutas con prefijo
app.use('/check', require('./routes/check'));
app.use('/headings', require('./routes/headings'));
app.use('/metadata', require('./routes/metadata'));
app.use('/screenshot', require('./routes/screenshot'));
app.use('/div-text', require('./routes/getDivText'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

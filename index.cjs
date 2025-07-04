const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Montar las rutas con prefijo
app.use(require('./routes/screenshot'));
app.use(require('./routes/metadata'));
app.use(require('./routes/check'));
app.use(require('./routes/headings'));
app.use(require('./routes/getDivText'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

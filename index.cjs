const express = require('express');
const app = express();
app.use(express.json());

app.use('/check', require('./routes/check'));
app.use('/screenshot', require('./routes/screenshot'));
app.use('/metadata', require('./routes/metadata'));
app.use('/headings', require('./routes/headings'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
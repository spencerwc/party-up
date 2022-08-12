const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());

app.use(logger('dev'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

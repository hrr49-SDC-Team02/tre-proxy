require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
require('dotenv').config({ path: '../config.env' });
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

app.get('/listing/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

app.get('/loaderio-*', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../${process.env.LOADERIO_FILENAME}.txt`));
});

module.exports = app;

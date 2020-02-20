const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.set('useCreateIndex', true);

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    winston.info(`Listening on port ${port}...`);
});

module.exports = server;

import winston = require('winston');
import mongoose = require('mongoose');
import config = require('config');

module.exports = function() {
  const db: string = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${db}...`));
}
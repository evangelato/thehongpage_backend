import winston = require('winston');
import express = require('express');

module.exports = function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction){
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something failed.');
}
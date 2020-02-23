import express = require('express');

module.exports = function (handler: Function) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };  
  }
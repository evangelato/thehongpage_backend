import mongoose = require('mongoose');
import express = require('express');

module.exports = function(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  next();
}
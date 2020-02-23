import express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const aboutMe = require('../routes/aboutMe');
const error = require('../middleware/error');

module.exports = function(app: express.Application) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/aboutMe', aboutMe);
    app.use(error);
}
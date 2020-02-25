import Joi = require('joi');
import bcrypt = require('bcrypt');
import _ = require('lodash');
import { User } from '../models/user';
import express = require('express');

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('Invalid username or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid username or password.');
    }

    const token = user.generateAuthToken();
    res.send(token);
});

const validate = (req: express.Request) => {
    const schema = {
        username: Joi.string()
            .min(5)
            .max(255)
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    };

    return Joi.validate(req, schema);
}

export default router;

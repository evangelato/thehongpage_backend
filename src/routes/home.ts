import express = require('express');
import { Home, validate } from '../models/home';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const home = await Home.find()
        .sort('-date')
        .limit(1);
    res.send(home);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let home = new Home({
        resumeUrl: req.body.resumeUrl,
        email: req.body.email,
    });

    home = await home.save();

    res.send(home);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const home = await Home.findByIdAndDelete(req.params.id);
    if (!home) {
        return res.status(404).send('The Home with the gievn ID was not found');
    }
    res.send(home);
});

router.put('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const home = await Home.findByIdAndUpdate(
        req.params.id,
        {
            resumeUrl: req.body.resumeUrl,
            email: req.body.email,
        },
        {
            new: true,
        },
    );

    if (!home) {
        return res.status(404).send('The Home with the given ID was not found');
    }
    res.send(home);
});

export default router;

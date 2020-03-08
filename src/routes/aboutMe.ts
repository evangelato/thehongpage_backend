import express = require('express');
import { AboutMe, validate } from '../models/aboutMe';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const aboutMe = await AboutMe.find()
        .sort('-date')
        .limit(1);
    res.send(aboutMe);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let aboutMe = new AboutMe({
        imageUrl: req.body.imageUrl,
        content: req.body.content,
    });

    aboutMe = await aboutMe.save();

    res.send(aboutMe);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const aboutMe = await AboutMe.findByIdAndDelete(req.params.id);
    if (!aboutMe) {
        return res.status(404).send('The About Me info with the given ID was not found');
    }
    res.send(aboutMe);
});

router.put('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const aboutMe = await AboutMe.findByIdAndUpdate(
        req.params.id,
        {
            imageUrl: req.body.imageUrl,
            content: req.body.content,
        },
        {
            new: true,
        },
    );

    if (!aboutMe) {
        return res.status(404).send('The About Me with the given ID was not found.');
    }
    res.send(aboutMe);
});

export default router;

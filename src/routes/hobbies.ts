import express = require('express');
import { Hobby, validate } from '../models/hobbies';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const hobby = await Hobby.find().sort('order');
    res.send(hobby);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let hobby = new Hobby({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        order: req.body.order,
    });
    hobby = await hobby.save();
    res.send(hobby);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const hobby = await Hobby.findByIdAndDelete(req.params.id);
    if (!hobby) {
        return res.status(404).send('The Hobby with the given ID was not found.');
    }
    res.send(hobby);
});

router.put('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const hobby = await Hobby.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            order: req.body.order,
        },
        {
            new: true,
        },
    );

    if (!hobby) {
        return res.status(404).send('The Hobby with the given ID was not found.');
    }
});

export default router;

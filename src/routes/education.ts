import express = require('express');
import { Education, validate } from '../models/education';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const education = await Education.find()
        .sort('-date')
        .limit(1);
    res.send(education);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let education = new Education({
        header: req.body.header,
        academics: req.body.academics,
        extracurricular: req.body.extracurricular,
    });

    education = await education.save();

    res.send(education);
});

router.delete(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
        return res.status(404).send('The Edcuation with the given ID was not found');
    }
    res.send(education);
});

router.put('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const education = await Education.findByIdAndUpdate(
        req.params.id,
        {
            header: req.body.header,
            academics: req.body.academics,
            extracurricular: req.body.extracurricular,
        },
        {
            new: true,
        },
    );

    if (!education) {
        return res.status(404).send('The Education with the given ID was not found');
    }
    res.send(education);
});

export default router;

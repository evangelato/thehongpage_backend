import express = require('express');
import { Skill, validate } from '../models/skills';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const skill = await Skill.find();
    res.send(skill);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let skill = new Skill({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        type: req.body.type,
        order: req.body.order,
    });
    skill = await skill.save();
    res.send(skill);
});

router.delete(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
        return res.status(404).send('The Skill with the given ID was not found.');
    }
    res.send(skill);
});

router.put(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const skill = await Skill.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            type: req.body.type,
            order: req.body.order,
        },
        {
            new: true,
        },
    );
    if (!skill) {
        return res.status(404).send('The Skill with the given ID was not found.');
    }
});

export default router;

import express = require('express');
import { Project, validate } from '../models/projects';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const project = await Project.find().sort('order');
    res.send(project);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        photoUrl: req.body.photoUrl,
        tags: req.body.tags,
        externalUrls: req.body.externalUrls,
        order: req.body.order,
    });
    project = await project.save();
    res.send(project);
});

router.delete(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
        return res.status(404).send('The Project with the given ID was not found');
    }
    res.send(project);
});

router.put(':id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            photoUrl: req.body.photoUrl,
            tags: req.body.tags,
            externalUrls: req.body.externalUrls,
            order: req.body.order,
        },
        {
            new: true,
        },
    );
    if (!project) {
        return res.status(404).send('The Project data with the given ID was not found.');
    }
});

export default router;

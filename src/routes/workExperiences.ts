import express = require('express');
import { WorkExperience, validate } from '../models/workExperience';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    const workExperience = await WorkExperience.find().sort('-_id');
    res.send(workExperience);
});

router.post('/', [auth, admin], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let workExperience = new WorkExperience({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        description: req.body.description,
        duration: req.body.duration,
    });
    workExperience = await workExperience.save();
    res.send(workExperience);
});

router.delete(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const workExperience = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!workExperience) {
        return res.status(404).send('The Work Experience with the given ID was not found');
    }
    res.send(workExperience);
});

router.put(':/id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const workExperience = await WorkExperience.findByIdAndUpdate(
        req.params.id,
        {
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            description: req.body.description,
            duration: req.body.duration,
        },
        {
            new: true,
        },
    );

    if (!workExperience) {
        return res.status(404).send('The Work Experience data with the given ID was not found.');
    }
    res.send(workExperience);
});

export default router;

const { AboutMe, validate } = require('../models/aboutMe');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const aboutMe = await AboutMe.find().sort('-date').limit(1);
    res.send(aboutMe);
});
    
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let aboutMe = new AboutMe({ content: req.body.content });
    aboutMe = await aboutMe.save();

    res.send(aboutMe);
});

router.delete('/:id', [auth, admin, validateObjectId], async(req, res) => {
    const aboutMe = await AboutMe.findByIdAndDelete(req.params.id);
    if (!aboutMe) {
        return res.status(404).send('The About Me info with the given ID was not found');
    }
    res.send(aboutMe);
});

router.put('/:id', [auth, admin, validateObjectId], async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const aboutMe = await AboutMe.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!aboutMe) {
        return res.status(404).send('The About Me info with the given ID was not found');
    }
    res.send(aboutMe);
})

module.exports = router;
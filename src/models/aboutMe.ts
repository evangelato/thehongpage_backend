import Joi = require('joi');
import mongoose = require('mongoose');

interface AboutMeType {
    content: string;
    date: Date;
}

const aboutMeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5000,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

const validateAboutMe = (aboutMe: AboutMeType) => {
    const schema = {
        content: Joi.string()
            .min(5)
            .max(5000)
            .required(),
    };
    return Joi.validate(aboutMe, schema);
};

export { aboutMeSchema, AboutMe, validateAboutMe as validate };

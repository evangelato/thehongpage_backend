import Joi = require('joi');
import mongoose = require('mongoose');
interface Paragraph {
    content: string;
}

interface AboutMeType {
    imageUrl: string;
    content: Paragraph[];
    date: Date;
}

const aboutMeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        maxlength: 200,
    },
    content: {
        type: Array,
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
        imageUrl: Joi.string()
            .max(200)
            .required(),
        content: Joi.array()
            .items(
                Joi.string()
                    .min(5)
                    .max(5000),
            )
            .required(),
    };
    return Joi.validate(aboutMe, schema);
};

export { aboutMeSchema, AboutMe, validateAboutMe as validate };

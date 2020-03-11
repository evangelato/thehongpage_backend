import Joi = require('joi');
import mongoose = require('mongoose');

interface ExternalUrl {
    description: string;
    url: string;
}

const externalUrlSchema = Joi.object().keys({
    description: Joi.string(),
    url: Joi.string(),
});

interface WorkExperienceType {
    companyName: string;
    jobTitle: string;
    description: string[];
    duration: string;
    externalUrls: ExternalUrl[];
    order: number;
}

const workExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: Array,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        minlength: 5,
        maxlengh: 50,
    },
    externalUrls: {
        type: Array,
    },
    order: {
        type: Number,
        required: true,
    },
});

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

const validateWorkExperience = (workExperience: WorkExperienceType) => {
    const schema = {
        companyName: Joi.string()
            .min(5)
            .max(50)
            .required(),
        jobTitle: Joi.string()
            .min(5)
            .max(50)
            .required(),
        description: Joi.array()
            .items(Joi.string())
            .required(),
        duration: Joi.string()
            .min(5)
            .max(50)
            .required(),
        externalUrls: Joi.array().items(externalUrlSchema),
        order: Joi.number().required(),
    };
    return Joi.validate(workExperience, schema);
};

export { workExperienceSchema, WorkExperience, validateWorkExperience as validate };

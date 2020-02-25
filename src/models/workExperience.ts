import Joi = require('joi');
import mongoose = require('mongoose');

interface WorkExperienceType {
    title: string,
    subTitle: string,
    content: string,
}

const workExperienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    subTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5000
    },
    duration: {
        type: String,
        required: true,
        minlength: 5,
        maxlengh: 50,
    }
})

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

const validateWorkExperience = (workExperience: WorkExperienceType) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        subTitle: Joi.string().min(5).max(50).required(),
        content: Joi.string().min(5).max(5000).required(),
        duration: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(workExperience, schema);
}

export { workExperienceSchema, WorkExperience, validateWorkExperience as validate};
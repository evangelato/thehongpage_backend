import Joi = require('joi');
import mongoose = require('mongoose');

interface WorkExperienceType {
    companyName: string,
    jobTitle: string,
    description: string,
    duration: string,
}

const workExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
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
        companyName: Joi.string().min(5).max(50).required(),
        jobTitle: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(5000).required(),
        duration: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(workExperience, schema);
}

export { workExperienceSchema, WorkExperience, validateWorkExperience as validate};
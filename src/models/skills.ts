import Joi = require('joi');
import mongoose = require('mongoose');

interface SkillType {
    title: string;
    imageUrl: string;
    type: string;
    order: number;
}

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    order: {
        type: Number,
        required: true,
    },
});

const Skill = mongoose.model('Skill', skillSchema);

const validateSkill = (skill: SkillType) => {
    const schema = {
        title: Joi.string()
            .min(1)
            .max(50)
            .required(),
        imageUrl: Joi.string()
            .min(1)
            .max(50)
            .required(),
        type: Joi.string()
            .min(1)
            .max(50)
            .required(),
        order: Joi.number().required(),
    };
    return Joi.validate(skill, schema);
};

export { skillSchema, Skill, validateSkill as validate };

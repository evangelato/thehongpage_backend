import Joi = require('joi');
import mongoose = require('mongoose');

interface HobbyType {
    title: string;
    description: string;
    imageUrl: string;
    order: number;
}

const hobbySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 200,
    },
    imageUrl: {
        type: String,
        required: true,
        maxlength: 200,
    },
    order: {
        type: Number,
        required: true,
    },
});

const Hobby = mongoose.model('Hobby', hobbySchema);

const validateHobby = (hobby: HobbyType) => {
    const schema = {
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        description: Joi.string()
            .min(5)
            .max(200),
        imageUrl: Joi.string()
            .max(200)
            .required(),
        order: Joi.number().required(),
    };
    return Joi.validate(hobby, schema);
};

export { hobbySchema, Hobby, validateHobby as validate };

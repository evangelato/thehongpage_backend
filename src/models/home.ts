import Joi = require('joi');
import mongoose = require('mongoose');

interface HomeType {
    resumeUrl: string;
    email: string;
    date: Date;
}

const homeSchema = new mongoose.Schema({
    resumeUrl: {
        type: String,
        required: true,
        maxlength: 200,
    },
    email: {
        type: String,
        required: true,
        maxlength: 200,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Home = mongoose.model('Home', homeSchema);

const validateHome = (home: HomeType) => {
    const schema = {
        resumeUrl: Joi.string()
            .max(200)
            .required(),
        email: Joi.string()
            .max(200)
            .required(),
    };
    return Joi.validate(home, schema);
};

export { homeSchema, Home, validateHome as validate };

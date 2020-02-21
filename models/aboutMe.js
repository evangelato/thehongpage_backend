const Joi = require('joi');
const mongoose = require('mongoose');

const aboutMeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5000
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    }
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

function validateAboutMe(aboutMe) {
    const schema = {
        content: Joi.string().min(5).max(5000).required()
    };
    return Joi.validate(aboutMe, schema);
}

exports.aboutMeSchema = aboutMeSchema;
exports.AboutMe = AboutMe;
exports.validate = validateAboutMe;
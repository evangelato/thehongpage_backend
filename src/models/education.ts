import Joi = require('joi');
import mongoose = require('mongoose');

interface EducationType {
    header: {
        title: string;
        subtitle1: string;
        subtitle2: string;
        imageUrl: string;
    };
    academics: {
        title: string;
        content: string;
        imageUrl: string;
    };
    extracurricular: {
        title: string;
        content: string;
        imageUrl: string;
    };
}

const MainPostSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
    subtitle1: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
    subtitle2: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
    imageUrl: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true,
    },
});

const FeaturedPostSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true,
    },
    content: {
        type: String,
        minlength: 5,
        maxlength: 500,
    },
    imageUrl: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true,
    },
});

const educationSchema = new mongoose.Schema({
    header: {
        type: MainPostSchema,
        required: true,
    },
    academics: {
        type: FeaturedPostSchema,
        required: true,
    },
    extracurricular: {
        type: FeaturedPostSchema,
        required: true,
    },
});

const Education = mongoose.model('Education', educationSchema);

const validateEducation = (education: EducationType) => {
    const schema = {
        header: Joi.object().keys({
            title: Joi.string()
                .min(5)
                .max(200)
                .required(),
            subtitle1: Joi.string()
                .min(5)
                .max(200)
                .required(),
            subtitle2: Joi.string()
                .min(5)
                .max(200)
                .required(),
            imageUrl: Joi.string()
                .min(1)
                .max(200)
                .required(),
        }),
        academics: Joi.object().keys({
            title: Joi.string()
                .min(5)
                .max(200)
                .required(),
            content: Joi.string()
                .min(5)
                .max(500),
            imageUrl: Joi.string()
                .min(1)
                .max(200)
                .required(),
        }),
        extracurricular: Joi.object().keys({
            title: Joi.string()
                .min(5)
                .max(200)
                .required(),
            content: Joi.string()
                .min(5)
                .max(500),
            imageUrl: Joi.string()
                .min(1)
                .max(200)
                .required(),
        }),
    };
    return Joi.validate(education, schema);
};

export { educationSchema, Education, validateEducation as validate };

import Joi = require('joi');
import mongoose = require('mongoose');

interface ExternalUrl {
    sitename: string;
    url: string;
}

interface ProjectType {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    externalUrls: ExternalUrl[];
    order: number;
}

const externalUrlSchema = Joi.object().keys({
    sitename: Joi.string(),
    url: Joi.string(),
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
    },
    imageUrl: {
        type: String,
        required: true,
        maxlength: 200,
    },
    tags: {
        type: Array,
    },
    externalUrls: {
        type: Array,
    },
    order: {
        type: Number,
        required: true,
    },
});

const Project = mongoose.model('Project', projectSchema);

const validateProject = (project: ProjectType) => {
    const schema = {
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        description: Joi.string()
            .min(5)
            .max(200)
            .required(),
        imageUrl: Joi.string()
            .max(200)
            .required(),
        tags: Joi.array().items(Joi.string()),
        externalUrls: Joi.array().items(externalUrlSchema),
        order: Joi.number().required(),
    };
    return Joi.validate(project, schema);
};

export { projectSchema, Project, validateProject as validate };

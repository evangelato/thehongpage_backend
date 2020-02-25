import config = require('config');
import jwt = require('jsonwebtoken');
import Joi = require('joi');
import mongoose = require('mongoose');
import mongodb = require('mongodb');

interface UserType {
    name: string;
    username: string;
    password: string;
}

interface IUser extends mongoose.Document {
    name: string;
    username: string;
    password: string;
    isAdmin: boolean;
    _id: mongodb.ObjectId;
    generateAuthToken: Function;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean,
});

userSchema.pre<IUser>('save', function(next) {
    const user = this;
    next();
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model<IUser>('User', userSchema);

const validateUser = (user: UserType) => {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        username: Joi.string()
            .min(5)
            .max(255)
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    };

    return Joi.validate(user, schema);
};

export { IUser, User, validateUser as validate };

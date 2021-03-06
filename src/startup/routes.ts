import express = require('express');
import auth from '../routes/auth';
import users from '../routes/users';
import home from '../routes/home';
import aboutMe from '../routes/aboutMe';
import workExperiences from '../routes/workExperiences';
import education from '../routes/education';
import projects from '../routes/projects';
import skills from '../routes/skills';
import hobbies from '../routes/hobbies';
import error from '../middleware/error';

const routes = (app: express.Application) => {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/home', home);
    app.use('/api/aboutMe', aboutMe);
    app.use('/api/workExperiences', workExperiences);
    app.use('/api/education', education);
    app.use('/api/projects', projects);
    app.use('/api/skills', skills);
    app.use('/api/hobbies', hobbies);
    app.use(error);
};

export default routes;

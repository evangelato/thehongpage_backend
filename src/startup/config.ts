import config = require('config');

const configSettings = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
};

export default configSettings;

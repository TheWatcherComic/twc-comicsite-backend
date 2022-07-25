const getFilesWithKeyword = require('./utils/getFilesWithKeyword');

const routes = (app) => {
    getFilesWithKeyword('router', __dirname + '/routes').forEach((file) => {
        const router = require(file);
        app.use('/', router);
        
    })
    
}

module.exports = routes;
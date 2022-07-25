const Server = require('./server');
const routes = require('./routes');

new Server().router(routes).listen();

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerMiddleware = require('./middlewares/swagger.middleware');
const fs = require('fs');

class Server {
  constructor() {

    // Initialization
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    
    // Middlewares
    this.app.use(morgan('dev'));
    this.app.use(cors());
    //this.routes();

    //Documentation
    //this.app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  // Routes
  /*routes() {
    getFilesWithKeyword('router', __dirname + '/routes').forEach((file) => {
      const router = require(file);
      this.app.use('/', router);
    })
  }*/

  router(routes) {
    this.routes = routes;
    return this;
  }
  // Starting the server
  listen() {
    swaggerMiddleware(this.app, this.routes)
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.info('Express application running on port: ' + port + ' 🔥');
    })
    return this.app;
  }

}
module.exports = Server;
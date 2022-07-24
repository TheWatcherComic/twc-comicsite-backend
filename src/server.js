require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getFilesWithKeyword = require('./utils/getFilesWithKeyword');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./utils/swagger-output.json')
const fs = require('fs');
class Server {
  constructor() {

    // Initialization
    this.app = express();
    this.app.set('json spaces', 4);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Middlewares
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use((err, req, res, next) => {
      return res.status(500).json({
        errorName: err.name,
        message: err.message,
        stack: err.stack || 'no stack defined'
      });
    });
    this.routes();

    // Documentation
    this.app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  // Routes
  routes() {
    getFilesWithKeyword('router', __dirname + '/routes').forEach((file) => {
      const router = require(file);
      this.app.use('/', router);
    })
  }


  // Starting the server
  listen() {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.info('Express application running on port: ' + port + ' 🔥');
    })
  }

}
module.exports = Server;
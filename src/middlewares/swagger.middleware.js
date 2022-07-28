const middleware = require('swagger-express-middleware');
const path = require('path');
const errorHandler = require('../middlewares/errorHandler.middleware');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-doc.json')

const swagger = (app, routes) => {
  return new Promise((resolve, reject) => {
    middleware(swaggerFile, app, (err, mw) => {
      if (err) {
        return reject(err);
      }
      app.enable('case sensitive routing');
      app.enable('strict routing');

      app.use(mw.metadata());
      app.use(
        mw.files(
          {
            caseSensitive: false,
            strict: false,
          },
          {
            useBasePath: false,
            apiPath: process.env.SWAGGER_API_SPEC,
          }
        )
      );

      app.use(
        mw.parseRequest({
          cookie: {
            secret: process.env.SESSION_SECRET,
          },
          json: {
            limit: process.env.REQUEST_LIMIT,
          },
        })
      );
      app.use(mw.CORS(), mw.validateRequest());

      routes(app);

      app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
      app.use(errorHandler);
      return resolve();
    });
  });
}

module.exports = swagger;

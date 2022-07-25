const middleware = require('swagger-express-middleware');
const path = require('path');
const errorHandler = require('../middlewares/errorHandler.middleware');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-doc.json')

const swagger = (app, routes) => {
  return new Promise((resolve, reject) => {
    middleware(swaggerFile, app, (err, mw) => {
      console.log("Entro")
      if (err) {
        return reject(err);
      }
      // Enable Express' case-sensitive and strict options
      // (so "/entities", "/Entities", and "/Entities/" are all different)
      app.enable('case sensitive routing');
      app.enable('strict routing');

      app.use(mw.metadata());
      app.use(
        mw.files(
          {
            // Override the Express App's case-sensitive
            // and strict-routing settings for the Files middleware.
            caseSensitive: false,
            strict: false,
          },
          {
            useBasePath: false,
            apiPath: process.env.SWAGGER_API_SPEC,
            // Disable serving the "api.yml" file
            // rawFilesPath: false
          }
        )
      );

      app.use(
        mw.parseRequest({
          // Configure the cookie parser to use secure cookies
          cookie: {
            secret: process.env.SESSION_SECRET,
          },
          // Don't allow JSON content over 100kb (default is 1mb)
          json: {
            limit: process.env.REQUEST_LIMIT,
          },
        })
      );
      // These two middleware don't have any options (yet)
      app.use(mw.CORS(), mw.validateRequest());

      routes(app);

      app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
      // eslint-disable-next-line no-unused-vars, no-shadow
      app.use(errorHandler);
      return resolve();
    });
  });
}

module.exports = swagger;

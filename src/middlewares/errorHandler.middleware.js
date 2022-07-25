// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ errorDescription: err.message });
  }
  
module.exports = errorHandler;
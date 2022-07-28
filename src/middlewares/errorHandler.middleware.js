// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).send({ errorDescription: err.message });
  }
module.exports = errorHandler;
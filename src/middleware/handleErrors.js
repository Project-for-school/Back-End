const createError = require("http-errors");

const handleErrors = {
  notFound: (req, res) => {
    const error = createError.NotFound("This route is not defined");
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },

  badRequest: (err, res) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },

  interalServerErrors: (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },

  unAuth: (err, res) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
      err: 1,
      mess: error.message,
    });
  },
};

module.exports = handleErrors;

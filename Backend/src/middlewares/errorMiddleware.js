const ClientError = require("../exceptions/ClientError");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = errorMiddleware;

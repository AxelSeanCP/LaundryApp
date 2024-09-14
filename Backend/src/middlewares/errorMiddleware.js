const ClientError = require("../exceptions/ClientError");

const errorMiddleware = (error, res) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  } else {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = errorMiddleware;

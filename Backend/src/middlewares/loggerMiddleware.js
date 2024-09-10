const loggerMidlleware = (req, res, next) => {
  console.log(`Logger: ${req.method} ${req.url}`);
  next();
};

module.exports = loggerMidlleware;

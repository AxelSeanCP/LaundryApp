require("dotenv").config();

const express = require("express");

const app = express();

const userRoutes = require("./src/routes/userRoutes");
const loggerMidlleware = require("./src/middlewares/loggerMiddleware");

app.use(loggerMidlleware);
app.use("/api", userRoutes);

function init() {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

init();

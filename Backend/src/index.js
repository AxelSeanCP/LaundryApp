require("dotenv").config();

const express = require("express");

// Middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");

// Routes
const member = require("./routes/memberRoutes");
const service = require("./routes/serviceRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/members", member);
app.use("/services", service);
app.use("/transactions");

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

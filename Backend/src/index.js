require("dotenv").config();

const express = require("express");

// Routes
const member = require("./routes/memberRoutes");
const service = require("./routes/serviceRoutes");
const transaction = require("./routes/transactionRoutes");
const organization = require("./routes/organizationRoutes");
const user = require("./routes/userRoutes");
const authentication = require("./routes/authenticationRoutes");
const report = require("./routes/reportRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/members", member);
app.use("/services", service);
app.use("/transactions", transaction);
app.use("/organizations", organization);
app.use("/users", user);
app.use("/authentications", authentication);
app.use("/reports", report);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

require("dotenv").config();

const express = require("express");

// Routes
const member = require("./routes/memberRoutes");
const service = require("./routes/serviceRoutes");
const transaction = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/members", member);
app.use("/services", service);
app.use("/transactions", transaction);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

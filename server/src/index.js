const express = require("express");
require("dotenv").config();
const database = require("./config/connectdb");

const app = express();
const port = process.env.PORT || 5500;

database.connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

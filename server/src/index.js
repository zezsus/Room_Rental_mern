const express = require("express");
require("dotenv").config();
const database = require("./config/connectdb");
const routers = require("./routers/index");

const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());

routers(app);

database.connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

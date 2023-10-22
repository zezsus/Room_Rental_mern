const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("connected successfull!");
  } catch (error) {
    console.log("connected fail!");
  }
};

module.exports = { connectDB };

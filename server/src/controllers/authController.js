const User = require("../models/UserModel");

//[POST] api/auth/signup
//public
//register
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(401).json({
      success: false,
      message: "missing username or email or password!",
    });
  } else {
    try {
      const user = await User.findOne({ username });
      if (user) {
        res.status(401).json({
          success: false,
          message: "username already!",
        });
      } else {
        const mail = await User.findOne({ email });
        if (mail) {
          res.status(401).json({
            success: false,
            message: "email already!",
          });
        } else {
          const newUser = new User({ username, email, password });
          await newUser.save();

          res.status(201).json({
            success: true,
            message: "user create successfully!",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
};

//[POST] api/auth/signin
//public
//login
const signin = async (req, res) => {};

module.exports = { signup, signin };

const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

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

          const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN
          );

          res.status(201).json({
            success: true,
            message: "user create successfully!",
            accessToken,
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
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "missing email or password!",
    });
  } else {
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "email or password incorrect",
        });
      } else {
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN
        );
        res.json({
          success: true,
          message: "login successfully",
          accessToken,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
};

module.exports = { signup, signin };

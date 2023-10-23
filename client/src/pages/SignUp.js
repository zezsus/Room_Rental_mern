import React from "react";
import "../assets/styles/SignUp.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signup">
      <h1 className="title">Sign Up</h1>
      <form className="form-signup">
        <input
          type="text"
          placeholder="username"
          name="username"
          className="username"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="email"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="password"
        />
        <button type="button" className="btn-signup">
          SIGN UP
        </button>
      </form>
      <div className="footer">
        <span>Have an account? </span>
        <Link to="/sign-in" className="link">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

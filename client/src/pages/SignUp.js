import React, { useState } from "react";
import "../assets/styles/SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "../util/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, formData);
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        navigate("/sign-in");
      }
    } catch (error) {
      if (error.response.data) {
        setAlert({
          type: "danger",
          message: error.response.data.message,
        });
        setTimeout(() => setAlert(null), 3000);
      } else {
        setAlert({
          type: "danger",
          message: error.message,
        });
      }
    }
  };

  return (
    <div className="signup">
      <h1 className="title">Sign Up</h1>
      {alert ? (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      ) : null}
      <form className="form-signup">
        <input
          type="text"
          placeholder="username"
          name="username"
          className="username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="password"
          value={password}
          onChange={handleChange}
        />
        <button className="btn-signup" onClick={handleSignUp}>
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

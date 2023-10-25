import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "../util/api";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, formData);
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        navigate("/");
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
      <h1 className="title">Sign In</h1>
      {alert ? (
        <div className="alert alert-danger" role="alert">
          {alert.message}
        </div>
      ) : null}

      <form className="form-signup">
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
        <button className="btn-signup" onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
      <div className="footer">
        <span>If you don't have an account? </span>
        <Link to="/sign-up" className="link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

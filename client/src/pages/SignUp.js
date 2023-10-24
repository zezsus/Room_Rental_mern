import React, { useContext, useState } from "react";
import "../assets/styles/SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const SignUp = () => {
  const { signupUser } = useContext(AuthContext);

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
      const signupData = await signupUser(formData);
      if (!signupData.success) {
        setAlert({ type: "danger", message: signupData.message });
        setTimeout(() => setAlert(""), 3000);
      } else {
        setAlert({ type: "success", message: signupData.message });
        setTimeout(() => setAlert(""), 3000);

        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <h1 className="title">Sign Up</h1>
      {alert ? (
        <div className={"alert alert-" + alert.type} role="alert">
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

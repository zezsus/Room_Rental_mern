import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const { signInUser } = useContext(UserContext);
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
    const signInData = await signInUser(formData);
    if (!signInData.success) {
      setAlert({ type: "danger", message: signInData.message });
      setTimeout(() => setAlert(""), 3000);
    } else {
      setAlert({ type: "success", message: signInData.message });
      setTimeout(() => setAlert(""), 3000);

      navigate("/");

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="signup">
      <h1 className="title">Sign In</h1>
      {alert ? (
        <div className={"alert alert-" + alert.type} role="alert">
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

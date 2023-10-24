import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const SignIn = () => {
  const { signinUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, password } = formData;
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signinData = await signinUser(formData);
      if (!signinData.success) {
        setAlert({
          type: "danger",
          message: signinData.message,
        });
        setTimeout(() => setAlert(""), 3000);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
          type="text"
          placeholder="username or email"
          name="username"
          className="username"
          value={username}
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

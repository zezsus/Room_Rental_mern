import { createContext } from "react";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./containts";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //sign-up
  const signupUser = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, userForm);
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        return res.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  //sign-in
  const signinUser = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, userForm);
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        return res.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  };

  const authContextData = { signupUser, signinUser };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

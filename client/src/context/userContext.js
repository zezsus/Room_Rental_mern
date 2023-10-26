import { createContext } from "react";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./contains";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //signUp
  const signUpUser = async (userData) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, userData);
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

  //signIn
  const signInUser = async (userData) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, userData);
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

  const userContextData = { signUpUser, signInUser };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

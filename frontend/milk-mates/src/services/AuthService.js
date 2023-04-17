import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { batchService } from "./BatchService";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the authentication state and related methods
export const AuthContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const AuthProvider = ({ children }) => {
  const { getBatchesByUser } = batchService()
  // set back to false when done
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginErrorCode, setLoginErrorCode] = useState(0);
  const [registerErrorCode, setRegisterErrorCode] = useState(-1);

  const login = async (username, password) => {
    setLoginErrorCode(0);
    try {
      const response = await axios.post(
        `${apiURL}/login/CheckForUser`,
        {
          username,
          password,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data[0].errorCode !== 0) {
        await setLoginErrorCode(response.data[0].errorCode);
        setUser(null);
      } else {
        const fetchedUser = response.data[1]
        await setLoginErrorCode(0);
        setLoggedIn(true);
        setUser(fetchedUser);
        
        await getBatchesByUser(fetchedUser.username)
      }
    } catch (error) {
      console.log(error);
      setLoginErrorCode(6);
    }
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);
  };

  const register = async (
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    zipCode,
    password
  ) => {
    setRegisterErrorCode(0);
    try {
      const response = await axios.post(
        `${apiURL}/login/RegisterUser`,
        {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          zipCode,
          password,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );

      setRegisterErrorCode(response.data[0].errorCode);
    } catch (error) {
      console.log(error);
      setLoginErrorCode(4);
    }
  };

  const checkToken = () => {};

  const getUserInfo = async (username) => {
    try {
      const response = await axios.post(
        `${apiURL}/profile/GetUserInfo`,
        { username },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      return response.data[1][0]
      
    } catch (error) {
      console.log(error);
      return null
    }
  };

  /*
  0 success
  1 no user with that username
  2 query error
  3 wrong old password
  */
  const changePassword = async (username, oldPassword, newPassword) => {
    try {
      const response = await axios.put(
        `${apiURL}/login/UpdateUserPassword`,
        { username, newPassword, oldPassword },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      return response.data[0].errorCode
      
    } catch (error) {
      console.log(error);
      return 4
    }
  };

 

  // Pass the authentication state and methods to the AuthContext.Provider component
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        login,
        logout,
        loginErrorCode,
        registerErrorCode,
        register,
        getUserInfo,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the authentication state and related methods
export const AuthContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const AuthProvider = ({ children }) => {
  // set back to false when done
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [loginErrorCode, setLoginErrorCode] = useState(0);
  const [registerErrorCode, setRegisterErrorCode] = useState(-1);

  // useEffect(() => {
  //   // Check if the user is already logged in
  //   const checkLoggedIn = async () => {
  //     try {
  //       const response = await axios.get("/api/user");
  //       if (response.status === 200) {
  //         setLoggedIn(true);
  //         setUser(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

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
        await setLoginErrorCode(0);
        setLoggedIn(true);
        setUser(response.data[1][0]);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

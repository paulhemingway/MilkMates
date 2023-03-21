import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the authentication state and related methods
export const AuthContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const AuthProvider = ({ children }) => {
  // set back to false when done
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorCode, setErrorCode] = useState(0);

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
    setErrorCode(0)
    try {
      const response = await axios.post(`${apiURL}/login/CheckForUser`, {
        username,
        password,
      }, {
        timeout: 5000, // Timeout after 3 seconds
      });

      if (response.data[0].errorCode !== 0) {
        await setErrorCode(response.data[0].errorCode);
        setUser(null);
      } else {
        setErrorCode(0);
        setLoggedIn(true);
        setUser(response.data[1][0]);
        
      }
    } catch (error) {
      console.log(error)
      setErrorCode(6);  
    }
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);
  };

  const checkToken = () => {
    
  }

  // Pass the authentication state and methods to the AuthContext.Provider component
  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, errorCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

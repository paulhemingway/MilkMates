import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the batch state and related methods
export const ListingContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const ListingProvider = ({ children }) => {
  const [userListings, setUserListings] = useState([]);

  const getUserListings = async (userId) => {
    try {
      const response = await axios.get(
        `${apiURL}/listing/GetAllListingsByUser?username=${username}`,

        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data.length > 1) {
        let newListings = response.data.slice(1);
        setUserListings(newListings);
      }

      return response.data[0].errorCode;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ListingContext.Provider
      value={{
        userListings,
        getUserListings
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListingService = () => {
  return useContext(ListingContext);
};

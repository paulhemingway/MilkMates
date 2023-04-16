import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the batch state and related methods
export const BatchContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const BatchProvider = ({ children }) => {
  const [batches, setBatches] = useState([]);

  const addBatch = async (
    username,
    date,
    volume,
    sickness,
    medications,
    vaccines,
    diet,
    caffeine
  ) => {
    return axios
      .post(
        `${apiURL}/tracker/AddBatch`,
        {
          username,
          date,
          volume,
          sickness,
          medications,
          vaccines,
          diet,
          caffeine,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      )
      .then((response) => {
        return response.data[0].errorCode;
      })
      .catch((error) => {
        return 7;
      });
  };

  const getBatchesByUser = async (username) => {
    try {
      const response = await axios.get(
        `${apiURL}/tracker/GetAllBatchesByUser?username=${username}`,
        
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if(response.data.length > 1) {
        let newBatches = response.data.slice(1)
        setBatches(newBatches)
      }

      return response.data[0].errorCode
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BatchContext.Provider
      value={{
        batches,
        addBatch,
        getBatchesByUser,
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatch = () => {
  return useContext(BatchContext);
};

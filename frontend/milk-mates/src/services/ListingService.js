import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { useBatchService } from "./BatchService";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

// Create a context for storing the batch state and related methods
export const ListingContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const ListingProvider = ({ children }) => {
  const [userListings, setUserListings] = useState([]);
  const { batches, setBatches } = useBatchService();

  const getListing = async (listingId) => {
    try {
      const response = await axios.get(
        `${apiURL}/listing/GetListing?listingid=${listingId}`,
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data[1]) {
        return response.data[1].listing[0];
      } else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserListings = async (username) => {
    try {
      const response = await axios.get(
        `${apiURL}/listing/GetAllListingsByUser?username=${username}`,

        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data[1]) {
        setUserListings(response.data[1]);
      } else {
        setUserListings([]);
      }

      return response.data[0].errorCode;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllListings = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/listing/GetAllListings`,

        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data[1]) {
        return response.data[1];
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListing = async (listingId, isAdmin, username, batchId) => {
    try {
      const response = await axios.put(
        `${apiURL}/listing/DeleteListing`,
        { listingId },
        { timeout: 5000 }
      );

      if (response.data[0].errorCode === 0) {
        if (!isAdmin) {
          await updateBatchListed(batchId, 0);
          await getUserListings(username);
        }

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBatchListed = async (batchId, isListed) => {
    // update the isListed property of a batch
    const updatedBatches = batches.map((batch) => {
      if (batch.batchId === batchId) {
        return { ...batch, isListed: isListed };
      }
      return batch;
    });
    await setBatches(updatedBatches);
  };

  const createListing = async (
    username,
    batchId,
    title,
    price,
    description
  ) => {
    const isGiving = 1;
    try {
      const response = await axios.post(
        `${apiURL}/listing/CreateListing`,
        {
          username,
          isGiving,
          batchId,
          title,
          price,
          description,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      );
      if (response.data[0].errorCode === 0) {
        await getUserListings(username);
        await updateBatchListed(batchId, 1);
        return 0;
      }
      return response.data[0].errorCode;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListingContext.Provider
      value={{
        userListings,
        getListing,
        setUserListings,
        getUserListings,
        getAllListings,
        createListing,
        deleteListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListingService = () => {
  return useContext(ListingContext);
};

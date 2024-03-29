import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import moment from "moment";

const apiURL = "https://milkmates.org:3000";

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
    date = moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
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
        // add the new batch to the batches state so you don't have to call the api again
        if (response.data[0].errorCode === 0) {
          setBatches([...batches, response.data[1]]);
        }
        return response.data[0].errorCode;
      })
      .catch((error) => {
        console.log(error);
        return 7;
      });
  };

  const editBatch = async (
    batchId,
    username,
    date,
    volume,
    sickness,
    medications,
    vaccines,
    diet,
    caffeine
  ) => {
    date = moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
    return axios
      .put(
        `${apiURL}/tracker/EditBatch`,
        {
          batchId,
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
      .then(async (response) => {
        // add the new batch to the batches state so you don't have to call the api again
        if (response.data[0].errorCode === 0) {
          // copy batches, remove the edited batch.
          let newBatches = [...batches].filter(batch => batch.batchId !== batchId)
          
          newBatches.push(response.data[1])

          await setBatches(newBatches);
        }
        return response.data[0].errorCode;
      })
      .catch((error) => {
        console.log(error);
        return 7
      });
  };

  //ERROR CODES:
  // 0 - success
  // 1 - No batch with that batchID exists
  // 2 - SQL update query error
  const deleteBatch = async (batchId) => {
    return axios
      .put(
        `${apiURL}/tracker/DeleteBatch`,
        {
          batchId,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      )
      .then(async (response) => {
        if (response.data[0].errorCode === 0) {
          // remove batch from the batches state
          const updatedBatches = batches.filter(
            (batch) => batch.batchId !== batchId
          );
          await setBatches(updatedBatches);
          return true;
        }
        return false;
      })
      .catch((error) => {
        return false;
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
      if (response.data.length > 1) {
        let newBatches = response.data.slice(1);
        setBatches(newBatches);
      }

      return response.data[0].errorCode;
    } catch (error) {
      console.log(error);
    }
  };

  const getBatch = (batchId) => {
    const batch = batches.find((batch) => batch.batchId == batchId);
    return batch;
  };

  const addBatchEvent = async (batchId, batchEventType, eventDate, notes) => {
    const date = moment(new Date(eventDate)).format("YYYY-MM-DD HH:mm:ss");
    return axios
      .post(
        `${apiURL}/tracker/AddBatchEvent`,
        {
          batchId,
          batchEventType,
          date,
          notes,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      )
      .then((response) => {
        if (response.data[0].errorCode === 0) {
          // event object returned by api
          const newEvent = response.data[1];

          // get index of batch in batch array
          const index = batches.findIndex((batch) => batch.batchId === batchId);

          // create a new event array with the new event added
          const newEventsArray = [...batches[index].events, newEvent];

          // copy the batch object with the events as the new events array
          const newBatch = { ...batches[index], events: newEventsArray };

          // copy the batches array
          const newBatches = [...batches];

          // set the newBatch at the index
          newBatches[index] = newBatch;

          // update batches
          setBatches(newBatches);

          return response.data[1];
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const deleteBatchEvent = async (batchId, batchEventId) => {
    return axios
      .put(
        `${apiURL}/tracker/DeleteBatchEvent`,
        {
          batchEventId,
        },
        {
          timeout: 5000, // Timeout after 5 seconds
        }
      )
      .then((response) => {
        if (response.data[0].errorCode === 0) {
          // get index of batch in batch array
          const index = batches.findIndex((batch) => batch.batchId === batchId);

          // create a new event array and remove the event
          const newEventsArray = [...batches[index].events].filter((event) => {
            return event.batchEventId !== batchEventId;
          });

          // copy the batch object with the events as the new events array
          const newBatch = { ...batches[index], events: newEventsArray };

          // copy the batches array
          const newBatches = [...batches];

          // set the newBatch at the index
          newBatches[index] = newBatch;

          // update batches
          setBatches(newBatches);

          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  return (
    <BatchContext.Provider
      value={{
        batches,
        setBatches,
        addBatch,
        editBatch,
        deleteBatch,
        getBatchesByUser,
        getBatch,
        addBatchEvent,
        deleteBatchEvent,
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatchService = () => {
  return useContext(BatchContext);
};

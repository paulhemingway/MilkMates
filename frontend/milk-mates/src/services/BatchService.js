import axios from "axios";

const apiURL = "http://ec2-54-159-200-221.compute-1.amazonaws.com:3000";

async function addBatch(
  username,
  date,
  volume,
  sickness,
  medications,
  vaccines,
  diet,
  caffeine
) {
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
      return 7
    });
}

async function postData(data) {
  const response = await fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
}

export { addBatch, postData };

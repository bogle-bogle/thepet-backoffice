import axios from "axios";

const serverUrl = String(process.env.REACT_APP_SERVER_URL);

async function get(endpoint, params = "") {
  let requestURL = "";

  if (params === "") {
    requestURL = serverUrl + endpoint;
  } else {
    requestURL = serverUrl + endpoint + "/" + params;
  }

  return axios.get(requestURL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
}

async function post(endpoint, data) {
  console.log(serverUrl);

  return axios.post(serverUrl + endpoint, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
}

async function put(endpoint, data) {
  return axios.put(serverUrl + endpoint, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
}

async function del(endpoint, params = "") {
  return axios.delete(serverUrl + endpoint + "/" + params);
}
export { get, post, put, del as delete };

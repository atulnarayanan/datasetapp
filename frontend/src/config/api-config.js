import axios from "axios";

let HOST_NAME = "";
if (parseInt(process.env.REACT_APP_PRODUCTION)) {
  HOST_NAME = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;
} else {
  HOST_NAME = process.env.REACT_APP_BACKEND_URL;
}

export const getDatasetList = async () => {
  return await axios.get(`${HOST_NAME}/dataset`).then((res) => {
    return res?.data;
  });
};

export const addNewDataset = async (body) => {
  return await axios
    .post(`${HOST_NAME}/dataset`, body)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

export const computeDataset = async (id, body) => {
  return await axios
    .post(`${HOST_NAME}/dataset/${id}/compute`, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response;
    });
};

export const plotDataset = async (id, fieldslist) => {
  var field = JSON.stringify(fieldslist);
  var fields = encodeURIComponent(field);
  return await axios
    .get(`${HOST_NAME}/dataset/${id}/plot`, { params: { fields } })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response;
    });
};

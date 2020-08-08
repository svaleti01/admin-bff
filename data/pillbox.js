const axios = require('axios');

const baseUrl =  process.env.PHARMACIST_URL;

const getPillboxes = () => {
  return apiGetCall();
};

const addPillbox = (pillbox) => {
  return apiPostCall(pillbox);
};

const apiGetCall = async() => {
  try {
    const resp = await axios.get( baseUrl + '/getAllPillboxes');
    return resp.data;
  } catch(error) {
    console.log(error);
  }
}

const apiPostCall = async(pillbox) => {
  try {
    const resp = await axios.post( baseUrl + '/addPillbox', pillbox)
    return resp.data
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  getPillboxes,
  addPillbox
};

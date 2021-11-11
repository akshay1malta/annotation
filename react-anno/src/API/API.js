import axios from "axios";
const baseURL = "http://127.0.0.1:5000/";

const signup = async (params) => {
  return await axios
    .post(`${baseURL}signup`, params)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

const login = async (params) => {
  return await axios
    .post(`${baseURL}login`, params)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

const upload = async (params) => {
  return await axios
    .post(`${baseURL}upload`, params, {
      headers: {
          "Authorization": "",
          "Content-type": "multipart/form-data",
      },                    
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};


const getImages = async (param) => {
  return await axios
    .get(`${baseURL}getImages`,  { params: param})
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};

const getSingleImage = async (param) => {
  return await axios
    .get(`${baseURL}getSingleImage`,  { params: param})
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
};



const download = async (param) => {
  return await axios
    .post(`${baseURL}download`,  param)
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();

    })
    .catch((err) => err);
};




export {signup, login, upload, getImages, getSingleImage, download}

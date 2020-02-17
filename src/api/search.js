import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const searchArticles = (page, type, query) => {
  return axios.get(`${API_PATH}/articles/search?page=${page}&searchType=${type}&query=${query}`);
}

const searchStores = (page, type, query) => {
  return axios.get(`${API_PATH}/shops/search?page=${page}&searchType=${type}&query=${query}`);
}

export {
  searchArticles,
  searchStores
}
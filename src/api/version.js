import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const getBusVersion = (type) => {
    return axios.get(`${API_PATH}/versions/${type}`);
}

export {
    getBusVersion
}
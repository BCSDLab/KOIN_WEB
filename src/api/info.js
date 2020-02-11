import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

// 버스
const getBusInfo = (depart, arrival) => {
  return axios.get(`${API_PATH}/buses/?depart=${depart}&arrival=${arrival}`);
}

// 식단
const getCafeteriaMenu = date => {
  return axios.get(`${API_PATH}/dinings/?date=${date}`);
}

// FAQ
const getFaqList = page => {
  return axios.get(`${API_PATH}/faqs?page=${page}`);
}

// 주변상점
const getStoreList = () => {
  return axios.get(`${API_PATH}/shops`)
}

const getStoreInfo = storeId => {
  return axios.get(`${API_PATH}/shops/${storeId}`);
}

// 동아리
const getCircleList = () => {
  return axios.get(`${API_PATH}/circles/?limit=999`);
}

const getCircleInfo = circleId => {
  return axios.get(`${API_PATH}/circles/${circleId}`);
}

// 복덕방
// 코멘트 추가 API는 사용하지 않아서 추가하지 않았음.
const getRoomList = () => {
  return axios.get(`${API_PATH}/lands`);
}

const getRoomInfo = roomId => {
  return axios.get(`${API_PATH}/lands/${roomId}`);
}

// 시간표
const getAllLecture = id => {
  return axios.get(`${API_PATH}/lectures/?semester_date=${id}`);
}

const addSubject = (token, body) => {
  return axios.post(`${API_PATH}/timetables`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const removeSubject = (token, id) => {
  return axios.delete(`${API_PATH}/timetables?id=${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const getMyTimeTable = (token, id) => {
  return axios.get(`${API_PATH}/timetables?semester=${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const getVersion = type => {
  return axios.get(`${API_PATH}/versions/${type}`);
}

// 분실물
// 내 분실물을 받아오는 getMyLostItem은 사용하지 않아서 추가하지 않았습니다.
const getLostItems = nowPageNum => {
  return axios.get(`${API_PATH}/lost/lostItems?page=${nowPageNum}&limit=10`)
}

const registerLostItem = (token, body) => {
  return axios.post(`${API_PATH}/lost/lostItems`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const getSpecificLostItem = (token, id) => {
  return axios.get(`${API_PATH}/lost/lostItems/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const adjustLostComment = (token, itemId, id, body) => {
  return axios.put(`${API_PATH}/lost/lostItems/${itemId}/comments/${id}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const deleteLostComment = (token, itemId, id) => {
  return axios.delete(`${API_PATH}/lost/lostItems/${itemId}/comments/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const registerLostComment = (token, itemId, body) => {
  return axios.post(`${API_PATH}/lost/lostItems/${itemId}/comments`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const deleteLostItem  = (token, id) => {
  return axios.delete(`${API_PATH}/lost/lostItems/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export {
  getBusInfo,
  getCafeteriaMenu,
  getFaqList,
  getStoreList,
  getStoreInfo,
  getCircleList,
  getCircleInfo,
  getRoomList,
  getRoomInfo,
  getAllLecture,
  addSubject,
  removeSubject,
  getMyTimeTable,
  getVersion,
  getLostItems,
  registerLostItem,
  getSpecificLostItem,
  adjustLostComment,
  deleteLostComment,
  registerLostComment,
  deleteLostItem
}

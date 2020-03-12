import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

// 게시글 조회
const getItemList = (page, type) => {
  return axios.get(`${API_PATH}/market/items?page=${page}&type=${type}&limit=12`);
}

const getMyItemList = (page, type, token) => {
  return axios.get(`${API_PATH}/market/my/items?page=${page}&type=${type}&limit=12`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const getItemInfo = (itemId, token) => {
  return axios.get(`${API_PATH}/market/items/${itemId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const getIndexPageItemList = page => {
  return axios.get(`${API_PATH}/market/items?page=${page}`);
}

// 게시글 생성, 삭제, 수정
const registerItem = (token, body) => {
  return axios.post(`${API_PATH}/market/items`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const removeItem = (itemId, token) => {
  return axios.delete(`${API_PATH}/market/items/${itemId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const reviseItem = (itemId, body, token) => {
  return axios.put(`${API_PATH}/market/items/${itemId}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

// 코멘트 생성, 삭제, 수정
const registerComment = (itemId, token, body) => {
  return axios.post(`${API_PATH}/market/items/${itemId}/comments`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const removeComment = (itemId, commentId, token) => {
  return axios.delete(`${API_PATH}/market/items/${itemId}/comments/${commentId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const reviseComment = (itemId, commentId, token, body) => {
  return axios.put(`${API_PATH}/market/items/${itemId}/comments/${commentId}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

// 이미지 등록
const uploadImage = (token, formData) => {
  return axios.post(`${API_PATH}/market/items/image/upload`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const uploadThumbnailImage = (token, formData) => {
  return axios.post(`${API_PATH}/market/items/image/thumbnail/upload`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

const checkItemAuthority = (token, body) => {
  return axios.post(`${API_PATH}/market/items/grant/check`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export {
  getItemList,
  getMyItemList,
  getItemInfo,
  getIndexPageItemList,
  registerItem,
  removeItem,
  reviseItem,
  registerComment,
  removeComment,
  reviseComment,
  uploadImage,
  uploadThumbnailImage,
  checkItemAuthority
}
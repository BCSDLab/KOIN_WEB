import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const getArticleList = (page, boardId) => {
  if (boardId !== '-1') {
    return axios.get(`${API_PATH}/articles?page=${page}&boardId=${boardId}`);
  } else {
    return axios.get(`${API_PATH}/temp/articles?page=${page}`);
  }
}

const getArticle = (articleId, token, boardId) => {
  if (boardId !== '-1') {
    return axios.get(`${API_PATH}/articles/${articleId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.get(`${API_PATH}/temp/articles/${articleId}`);
  }
}

const getHotArticleList = () => {
  return axios.get(`${API_PATH}/articles/hot/list`);
}

const getIndexPageArticleList = boardId => {
  if(boardId !== -1) {
    return axios.get(`${API_PATH}/articles/new/list?offset=1&boardId=${boardId}&limit=5`);
  }
  else {
    return axios.get(`${API_PATH}/temp/articles?page=1&limit=5`);
  }
}

// 게시글 생성, 삭제, 수정
const registerArticle = (token, body, boardId) => {
  if (boardId !== '-1') {
    return axios.post(`${API_PATH}/articles`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.post(`${API_PATH}/temp/articles`, body);
  }
}

const removeArticle = (articleId, token) => {
  return axios.delete(`${API_PATH}/articles/${articleId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const removeAnonymousArticle = (articleId, password) => {
  return axios.delete(`${API_PATH}/temp/articles/${articleId}`, {
    headers: {
      "password": password
    }
  })
}

const reviseArticle = (articleId, token, body, boardId) => {
  if (boardId !== '-1') {
    return axios.put(`${API_PATH}/articles/${articleId}`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.put(`${API_PATH}/temp/articles/${articleId}`, body);
  }
}

// 코멘트 생성, 삭제, 수정
const registerComment = (articleId, token, body, boardId) => {
  if (boardId !== '-1') {
    return axios.post(`${API_PATH}/articles/${articleId}/comments`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.post(`${API_PATH}/temp/articles/${articleId}/comments`, body);
  }
}

const removeComment = (articleId, commentId, token, boardId, password) => {
  if (boardId !== '-1') {
    return axios.delete(`${API_PATH}/articles/${articleId}/comments/${commentId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.delete(`${API_PATH}/temp/articles/${articleId}/comments/${commentId}`, {
      headers: {
        "password": password
      }
    });
  }
}

const reviseComment = (articleId, commentId, token, body, boardId) => {
  if (boardId !== '-1') {
    return axios.put(`${API_PATH}/articles/${articleId}/comments/${commentId}`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.put(`${API_PATH}/temp/articles/${articleId}/comments/${commentId}`, body);
  }
}

const uploadAnonymousArticleImage = formData => {
  return axios.post(`${API_PATH}/temp/items/image/upload`, formData);
}

const checkArticleAuthority = (token, body, boardId) => {
  if (boardId !== '-1') {
    return axios.post(`${API_PATH}/articles/grant/check`, body, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } else {
    return axios.post(`${API_PATH}/temp/articles/grant/check`, body);
  }
}

export {
  getArticleList,
  getArticle,
  getHotArticleList,
  getIndexPageArticleList,
  registerArticle,
  removeArticle,
  removeAnonymousArticle,
  reviseArticle,
  registerComment,
  removeComment,
  reviseComment,
  uploadAnonymousArticleImage,
  checkArticleAuthority
}

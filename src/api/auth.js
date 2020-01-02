import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const refresh = token => {
  return axios.get(`${API_PATH}/user/refresh`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const login = body => {
  return axios.post(`${API_PATH}/user/login`, body);
}

const logout = token => {
  return axios.post(`${API_PATH}/user/logout`, {}, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const checkNickname = nickname => {
  return axios.get(`${API_PATH}/user/check/nickname/${nickname}`);
}

const signUp = body => {
  return axios.post(`${API_PATH}/user/register`, body);
}

const findPassword = body => {
  return axios.post(`${API_PATH}/user/find/password`, body);
}

const modifyUserInfo = (body, token) => {
  return axios.put(`${API_PATH}/user/me`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const userWithdrawl = token => {
  return axios.delete(`${API_PATH}/user/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

const loginCheck = token => {
  return axios.get(`${API_PATH}/user/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

export {
  refresh,
  login,
  logout,
  checkNickname,
  signUp,
  findPassword,
  modifyUserInfo,
  userWithdrawl,
  loginCheck
}
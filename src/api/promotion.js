import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

// 진행중인 이벤트 랜덤 조회
const getRandomPendingPromotion = () => {
  return axios.get(`${API_PATH}/events/pending/random`);
}

export {
  getRandomPendingPromotion
}
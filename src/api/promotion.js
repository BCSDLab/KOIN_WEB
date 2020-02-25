import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const getPromotionList = (nowPageNum, limit) => {
    return axios.get(API_PATH + 'events/?page=' + nowPageNum + '&limit=' + limit)
};
const getPendingPromotionList = (nowPageNum, limit) => {
    return axios.get(API_PATH + 'events/pending/?page=' + nowPageNum + '&limit=' + limit)
};
const getClosedPromotionList = (nowPageNum, limit) => {
    return axios.get(API_PATH + 'events/closed/?page=' + nowPageNum + '&limit=' + limit)
};
const checkMyPromotion = (token) => {
    return axios.get(API_PATH + 'events/pending/my?page=1&limit=12', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};

const getMyStore = (token) => {
    return axios.get(API_PATH + 'events/my/shops', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};

// Articles
const getSpecificPromotion = (articleId, token) => {
    return axios.get(API_PATH + 'events/' + articleId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};
const registerPromotion = (token, body) => {
    return axios.post(API_PATH + 'events', body, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};
const adjustPromotion = (articleId, token, body) => {
    return axios.put(API_PATH + 'events/' + articleId, body, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};
const removePromotion = (articleId, token) => {
    return axios.delete(API_PATH + 'events/' + articleId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};

// Comment
const grantCheckPromotion = (token, body) => {
    return axios.post(API_PATH + 'events/grant/check', body, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};
const registerPromotionComment = (articleId, token, body) => {
    return axios.post(API_PATH + 'events/' + articleId + '/comments', body, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};
const adjustPromotionComment = (articleId, id, token, body) => {
    return axios.put(API_PATH + 'events/' + articleId + '/comments/' + id, body, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};
const removePromotionComment = (articleId, id, token) => {
    return axios.delete(API_PATH + 'events/' + articleId + '/comments/' + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};

// 진행중인 이벤트 랜덤 조회
const getRandomPendingPromotion = () => {
    return axios.get(`${API_PATH}/events/pending/random`);
};

export {
    getPromotionList,
    getPendingPromotionList,
    getClosedPromotionList,
    checkMyPromotion,
    getMyStore,
    getSpecificPromotion,
    registerPromotion,
    adjustPromotion,
    removePromotion,
    grantCheckPromotion,
    registerPromotionComment,
    adjustPromotionComment,
    removePromotionComment,
    getRandomPendingPromotion
}
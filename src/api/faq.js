import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const getFaqList = page => {
  // return axios.get(`${API_PATH}/faqs?page=` + page)

  return {
    "faqs": [
      {
        "id": 3,
        "question": "질문?",
        "answer": "대답이다.",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2019-11-12 07:50:20",
        "circle_id": 0
      },
      {
        "id": 5,
        "question": "OT때에 신입생 장기자랑은 필수인가요? 아니면 신청하는건가요?",
        "answer": "OT때 신입생 장기자랑은 각 조별마다 필수 아닌 필수인듯한 필수로 하게 됩니다. 이게 먼 말이냐구요? 하기 싫으면 안 할 수 있지만 할 수 밖에 없다는 거??ㅋㅋ 신입생 장기자랑은 준비가 안되어있으면 장기자랑으로 못 나가는 경우도 종종 있긴 합니다만.. 첫 신입생 장기자랑인데 열심히 임하면 후회 없는 결과가 있을 것 같아요!!",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 6,
        "question": "기숙사 꼭 살아야 되나요? 통학해도 되나요?",
        "answer": "추가입사 신청할걸요 아마.",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 7,
        "question": "술 강요 있나요?",
        "answer": "그런거 없습니다. 혹시 누가 억지로 먹으라고 하면 뚝배기 깹시다.",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 8,
        "question": "조지아텍과 코리아텍은 무슨 관계인가요?",
        "answer": "조지아텍이 무슨 죄죠",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 9,
        "question": "동아리 가입은 어떻게하나요?",
        "answer": "동아리 회장/부회장 혹은 동아리원에게 연락하면 되요!",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 10,
        "question": "오티 때 기초 학력 평가를 보는데 잘 봐야 하나요?",
        "answer": "객관적으로 보았을 때 시험을 못 보는게 1학년 생활에 좋습니다. 기초학력 평가를 못 보게 되면 학교에서 친히 기초 미달로 분류하여 대학기초영어, 기초미적분을 수강하라고 합니다. 학점 받기 편하여 많은 선배들이 일부러 못 보는 길을 택했죠",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 11,
        "question": "헬스장은 시설 좋나요? 어디 있는지랑 운영시간 알려주세요!",
        "answer": "담헌 지하, 예솔관 지하, 체육관 1층 총 3곳에 있습니다. 체육관이 가장 시설이 좋아요~_~이용 시간은 신축 체육관 헬스장 : 6 - 24시 , 담헌 : 24시간 , 예솔관 지하 헬스장 : 6 - 24시 입니다.",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 12,
        "question": "성적표 배송되는 주소 바꿀 수 있나요?",
        "answer": "아뇨...등본가져와야 바꿔줍니다.",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      },
      {
        "id": 13,
        "question": "성적표는 언제 배송되나요? 숨길 수 있나요? ",
        "answer": "학기 끝나고 2~3주 정도 지나고 오고 다른 주소로 하세요 ㅎ",
        "is_deleted": false,
        "created_at": "2018-03-24 14:25:26",
        "updated_at": "2018-03-24 14:25:26",
        "circle_id": 0
      }
    ],
    "totalPage": 4
  }
};


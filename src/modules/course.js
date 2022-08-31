import {infoAPI} from "../api"

const GET_COURSES_INFO = "GET_COURSES_INFO";
const GET_COURSES_INFO_SUCCESS = "GET_COURSES_INFO_SUCCESS";
const GET_COURSES_INFO_ERROR = "GET_COURSES_INFO_ERROR";

const GET_TIMETABLE_INFO="GET_TIMETABLE_INFO";
const GET_TIMETABLE_INFO_SUCCESS="GET_TIMETABLE_INFO_SUCCESS";
const GET_TIMETABLE_INFO_ERROR="GET_TIMETABLE_INFO_ERROR";

export const getCourses = () => async dispatch => {
    dispatch({ type: GET_COURSES_INFO });
    try {
      const res = await infoAPI.getCourses();
      dispatch({
        type: GET_COURSES_INFO_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_TIMETABLE_INFO_ERROR,
        error: e
      })
    }
  };

  export const getTimeTable = (bus_type,region) => async dispatch => {
    dispatch({ type: GET_TIMETABLE_INFO });
    try {
      const res = await infoAPI.getTimetable(bus_type,region);
      dispatch({
        type: GET_TIMETABLE_INFO_SUCCESS,
        res
      });
    } catch (e) {
      dispatch({
        type: GET_TIMETABLE_INFO_ERROR,
        error: e
      })
    }
  };
const initialState = {
    courses:[{
        loading:false,
        data:{
            "id":null,
            "region":null,
            "bus_type":null,
        },
        error:null,
    }],
    course:{
        loading:false,
        data:{
            "to_school":[
            ],
            "from_school":[
            ],
        },
        error:null,
    }
}


export default function courseReducer(state = initialState, action) {
    switch(action.type){
        case GET_COURSES_INFO:
         return {
            ...state,
            courses:{
                loading:true,
                data:state.courses.data,
                error:null,
            }
         }
        case GET_COURSES_INFO_SUCCESS:
            return{
                ...state,
                courses:{
                    loading:false,
                    data:action.res.data,
                    error:null,
                }
            }
        case GET_COURSES_INFO_ERROR:
            return{
                ...state,
                courses:{
                    loading:false,
                    data:null,
                    error:action.error
                }
            }
        case GET_TIMETABLE_INFO:
            return{
                ...state,
                course:{
                    loading:true,
                    data:state.course.data,
                    error:null,
                }
            }
        case GET_TIMETABLE_INFO_SUCCESS:
            return{
                ...state,
                course:{
                    loading:false,
                    data:action.res.data,
                    error:null,
                }
            }
        case GET_TIMETABLE_INFO_ERROR:
            return{
                ...state,
                course:{
                    loading:false,
                    data:null,
                    error:action.error
                }
            }
        default:
            return state;
    }

}

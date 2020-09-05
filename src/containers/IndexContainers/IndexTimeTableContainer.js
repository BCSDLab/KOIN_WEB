import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllLecture, getAllSemester, getMyIndexLectures} from "../../modules/timetable";
import IndexTimeTable from "../../components/IndexComponents/IndexTimeTable";

export default function IndexTimeTableContainer() {
  const {indexLecture: { lectures }, selectedSemester} = useSelector(state => state.timetableReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = sessionStorage.getItem("token")
    console.log(lectures)
    if(token) {
      dispatch(getAllSemester());
    }
  }, [])

  useEffect(() => {
    if (selectedSemester) {
      let token = sessionStorage.getItem("token")
      dispatch(getMyIndexLectures({
        token
      }));
    }
  }, [dispatch, selectedSemester]);
  return (
    <IndexTimeTable lectures={lectures}/>
  )
}

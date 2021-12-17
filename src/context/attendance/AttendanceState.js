/*

This exists because I was considering storing the attendances in state but 
then changed my mind and just did pure API calls instead
*/



import React, { useContext, createContext, useReducer } from 'react'
import moment from 'moment'

import attendanceReducer from './attendanceReducer' 


const AttendanceContext = createContext()

const AttendanceState = props => {

  const initialState = {
    currentStudent: null,   //dont know if going to need this yet
    currentDate: moment(),
    studentAttendanceForDay: []
  }



  const [state, dispatch] = useReducer(attendanceReducer, initialState)

  const setCurrentDate = (date) => dispatch({ type: 'SET_DATE', payload: date })

  const setStudentAttendanceForDay = (attendance) => dispatch({ type: 'SET_STUDENT_ATTENDANCE', payload: attendance })



  const store = {
    currentDate: state.currentDate,
    setCurrentDate,
    studentAttendanceForDay: state.studentAttendanceForDay,
    setStudentAttendanceForDay
  }
  return (
    <AttendanceContext.Provider value={store}>
      { props.children }
    </AttendanceContext.Provider>
  )


}


export default AttendanceState


export const useAttendance = () => useContext(AttendanceContext)
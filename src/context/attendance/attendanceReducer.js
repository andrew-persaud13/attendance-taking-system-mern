


const attendanceReducer = (state, action) => {
  switch(action.type) {
    case 'SET_DATE':
      return {
        ...state,
        currentDate: action.payload
      }
    case 'SET_STUDENT_ATTENDANCE':
      return {
        ...state,
        studentAttendanceForDay: action.payload
      }
    default:
      return state
  }
}



export default attendanceReducer
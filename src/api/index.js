import axios from 'axios'

export const login = async (data) => {
  return await axios.post('http://localhost:3001/group7/login', data)
    .catch(err => Promise.reject(err.response.data.message))
}

export const getLoggedInUser = async (token, role) => {
  return await axios.post(`http://localhost:3001/group7/me/${role}`, {}, loadHeader(token))
    .catch(err => Promise.reject(err.response.data.message))
}

export const getChildren = async (token) => {
  return await axios.get('http://localhost:3001/group7/parent/children', loadHeader(token))
    .catch(err => Promise.reject(err.response.data.message))
}

export const getCourses = async (token) => {
  return await axios.get('http://localhost:3001/group7/teacher/courses', loadHeader(token))
    .catch(err => Promise.reject(err.response.data.message))
}

export const getCourseAttendance = async (token, id, day) => {
  return await axios.post(`http://localhost:3001/group7/attendance/course/${id}`, {day } ,loadHeader(token))
    .catch(err => Promise.reject(err.response.data.message))
}

export const getStudentAttendanceForDay = async (token, date, id) => {
  return axios.post(`http://localhost:3001/group7/attendance/${id}`, { date }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const getStudentAttendance = async (token, id) => {
  return axios.get(`http://localhost:3001/group7/attendance/${id}`, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const notifyByParent = async (token, id, status) => {
  return axios.post(`http://localhost:3001/group7/attendance/${id}/student`, {status}, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const markAttendance = async (token, attendances) => {
  return axios.post(`http://localhost:3001/group7/marked`, { attendances }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const getAttendancesToApprove = async (token, school, grade) => {
  return axios.post(`http://localhost:3001/group7/secretary/attendance`, { school, grade}, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const approveAttendance = async (token, attendances) => {
  return axios.post(`http://localhost:3001/group7/secretary/approved`, { attendances }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}


export const coursesAtSchool = async (token, school, grade) => {
  return axios.post('http://localhost:3001/group7/secretary/courses', { school, grade }, loadHeader(token))
}

export const viewApproved = async (token, course, date) => {
  return axios.post('http://localhost:3001/group7/secretary/viewapproved', { course, date }, loadHeader(token))
}

export const markAttendanceSecretary = async (token, attendances) => {
  return axios.post(`http://localhost:3001/group7/secretary/edit`, { attendances }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const getNotNotified = async (token, course) => {
  return axios.post(`http://localhost:3001/group7/secretary/notnotified`, { course }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const sendEmail = async (token, course, attendance, student, status) => {
  return axios.post(`http://localhost:3001/group7/secretary/notifyparent`, { course, attendance, student, status }, loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const registerSupplyTeacher = async (token, data) => {
  return axios.post(`http://localhost:3001/group7/supply/register`, data , loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}

export const getStudentRecord= async (token, account, school) => {
  return axios.post(`http://localhost:3001/group7/secretary/student`,{ account, school} , loadHeader(token))
  .catch(err => Promise.reject(err.response.data.message))
}



const loadHeader = (token) => ({ headers: { authtoken: 'Bearer ' + token } })
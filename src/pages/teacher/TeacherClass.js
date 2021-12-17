import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

import { useAuth } from '../../context/auth/AuthState'

import { getCourseAttendance, markAttendance } from '../../api'
import StudentRow from '../../components/StudentRow';

import './teacher-class.css'
const TeacherClass = () => {
  const { token } = useAuth()
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [today, _] = useState(moment('2020-12-07 12:00'))
  const [checked, setChecked] = useState([])
  

  useEffect(() => {
    getAttendance()
  }, [])

  const getAttendance = () => {
    setLoading(true)
    getCourseAttendance(token, id, today)
      .then(res => {
        setAttendance(res.data.attendance)
        console.log(res.data);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)

      })
  }

  const handleChange = (e, studentId) => {
    const currentAttendance = [...attendance]
    const idx = currentAttendance.findIndex(a => a.student._id === studentId)
    const att = currentAttendance.find(a => a.student._id === studentId)
    att.status = e.target.checked ? e.target.value : 'notmarked'
    currentAttendance[idx] = att

    setAttendance(currentAttendance)
  
  }

  const handleClick = () => {
    markAttendance(token, attendance)
      .then(res => {
        toast.success('Attendance has been marked! Contact secretary if any changes are needed.')
        getAttendance()
      })
      .catch(err => console.log(err))
  }

  const checkValidTime = () => moment(attendance[0]?.course?.startTime).minutes() + moment(attendance[0]?.course?.startTime).hours() * 60 <= moment(today).minutes() + moment(today).hours() * 60

  const checkAllStudentChecked = () => attendance.every(a => a.status !== 'notmarked') 

  const checkMarked = () => attendance.every(a => a.markedByTeacher)
  const renderStudents = () => 
 
    attendance.map(a => <StudentRow status={a.status} key={a._id} student={a.student} handleChange={handleChange} />) 


  if(loading || !attendance) return <h1>Loading...</h1>
  return (
    <div className="col mt-5 card-container ">
          <div className="card">
            <div className="card-header text-center">
              {attendance[0]?.course?.name} | Period {attendance[0]?.course?.period} | Grade {attendance[0]?.student.grade}
           </div>
            <ul class="list-group list-group-flush text-center">
              <li className="list-group-item">Current Date: { today.format('yyyy/M/D') } </li>
              <li className="list-group-item">Current Time: {today.format('HH:mm')}</li>
              <li className="list-group-item">Start Time: {moment(attendance[0]?.course?.startTime).format('HH:mm')} </li>
              <li className="list-group-item">End Time: {moment(attendance[0]?.course?.endTime).format('HH:mm')} </li>
              <li className="list-group-item">
                <h4 className="text-center mb-4">Your Students</h4>
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Student #</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Present</th>
                      <th scope="col">Late</th>
                      <th scope="col">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                   { renderStudents() }
                  </tbody>
              </table>  
              </li>
            </ul>
          </div>
          <div>
            <button disabled={!checkAllStudentChecked() || !checkValidTime() || checkMarked()} className="btn btn-dark text-center" onClick={handleClick}>Submit Attendance</button>
            { checkMarked() && <p className="text-success">Attendance is marked. Contact secretary for changes.</p> }
          </div>
         
          </div>
  );
};

export default TeacherClass;
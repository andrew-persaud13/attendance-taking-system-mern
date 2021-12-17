import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth/AuthState'

import SecretaryLayout from '../../components/SecretaryLayout'
import CourseOverviewRow from '../../components/CourseOverviewRow'

import { getAttendancesToApprove, approveAttendance } from '../../api'
import StudentRow from '../../components/StudentRow';


const SecretaryHome = () => {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  //const [today, _] = useState(moment('2020-12-07 12:00'))   Might use later
  const [show, setShow] = useState(false)
  const [attendances, setAttendances] = useState([])
  const [attendanceToShow, setAttendanceToShow] = useState([])
  const [grade, setGrade] = useState(null)

  

  const getCounts = (courseId, status, date) => {
  
    const att = attendances[date]
    if (!att) return
    let count = 0
    for (let a of att) {
      if (courseId === a.course._id) {
        if (a.status === status) {
          count++
        }
      }
    }
    return count
  }

  const callGetAttendancesToApprove = () => {
    if (!grade) return toast.error('Please select a grade')
    setLoading(true)
    getAttendancesToApprove(token, user.school, grade)
      .then(res => {
        setLoading(false)
        setCourses(res.data.courses)
        setAttendances(res.data.attendances)
        console.log(res.data.courses);
      })
      .catch(err => setLoading(false) )
  }

  const handleClick = (id, date) => {
    if(show) setShow(false)

    const courseList = attendances[date].filter(a => a.course._id === id)
    setAttendanceToShow(courseList)
    setShow(true)
  }

  const approve = ( ) => {
    approveAttendance(token, attendanceToShow)
      .then(_ => {callGetAttendancesToApprove(); setShow(false); toast.success('Attendance approved.')} )
  }

  const renderCourses = () => {
   const result = []
    for (let date in courses) {
      result.push(courses[date].map( c => <CourseOverviewRow date={date} handleClick={handleClick} key={ c._id } course={c} 
        getCounts={getCounts}
      />))
    }
    return result.flat()
  }
    

  const renderAttendance = () => {
    return attendanceToShow.map(a => <StudentRow key={ a._id } student={a.student} status={a.status} />)
  }

  return (
    <SecretaryLayout>
      <div className="text-center p-4">
        <label htmlFor="grade mr-2">Select Grade</label>
        <select name=" grade" id="grade" onChange={e => {setShow(false); setGrade(parseInt(e.target.value))}}>
          <option value="">Please select a grade</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <div className="text-center mt-2">
          <button onClick={callGetAttendancesToApprove} className="btn btn-info">Submit grade</button>
        </div>
      </div>
   
      <div className="text-center mt-4"><h3>The following attendances require approval:</h3></div>
      
      {!loading && courses && courses.length === 0 && <h4 className="text-center mt-5">All attendances have been approved.</h4>}
      <table class="table table-hover">
       <thead>
    <tr>
      <th scope="col">Instructor</th>
      <th scope="col">Course</th>
      <th scope="col">Period</th>
      <th scope="col">Date</th>
      <th scope="col">Present</th>
      <th scope="col">Late</th>
      <th scope="col">Absent</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
    {renderCourses()}
  </tbody>
</table>
      
    <hr/>
  
  {
    show && 
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
     { renderAttendance() }
    </tbody>
</table>  
  }
  <div className="text-center">
    {show && <button onClick={approve} disabled={attendanceToShow[0]?.secretaryApproved} className="btn btn-success">Approve attendance</button>}
  </div>
    </SecretaryLayout>
     
  );
};

export default SecretaryHome;
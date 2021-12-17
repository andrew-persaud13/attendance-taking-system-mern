import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'

import { useAuth } from '../../context/auth/AuthState'

import SecretaryLayout from '../../components/SecretaryLayout'
import DatePicker from '../../components/shared/DatePicker'
import StudentRow from '../../components/StudentRow'

import { coursesAtSchool, viewApproved, markAttendanceSecretary } from '../../api'



const SecretaryAll = () => {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState()
  const [date, setDate] = useState(moment('2020-12-07 12:00'))
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState()
  const [error, setError] = useState('')
  const [attendance, setAttendance] = useState([])
  const [show, setShow] = useState(false)
  const [showCourse, setShowCourse] = useState(false)



  const callCoursesAtSchool = (grade) => {
    setLoading(true)
    coursesAtSchool(token, user.school._id, grade)
    .then(res => {
      setLoading(false)    
      setCourses(res.data.courses)
      console.log(res.data.courses);
      setShowCourse(true)
    })
    .catch(err => {
      setLoading(false)
    })
  }

  const handleClick = () => {
    if (!selectedCourse || !date) {
      return setError('Please choose a day and course.')
    }
    if(error) setError('')

    viewApproved(token, selectedCourse, date)
      .then(res => {
        setAttendance(res.data.attendance)
        setShow(true)
      })
      .catch(_ => setShow(false))
  }

  const checkAllStudentChecked = () => attendance.every(a => a.status !== 'notmarked') 
  const handleChange = (e, studentId) => {
    const currentAttendance = [...attendance]
    const idx = currentAttendance.findIndex(a => a.student._id === studentId)
    const att = currentAttendance.find(a => a.student._id === studentId)
    att.status = e.target.checked ? e.target.value : 'notmarked'
    currentAttendance[idx] = att

    setAttendance(currentAttendance)
  
  }
  const renderStudents = () => 
    attendance.map(a => <StudentRow teacher={a.course.instructor.name} status={a.status} key={a._id} student={a.student} handleChange={handleChange} />) 


  const onGradeChange = (e) => {
    setShowCourse(false)
    let grade = parseInt(e.target.value)
    if (isNaN(grade)) return 
    callCoursesAtSchool(grade)
  }


  const submitEdit = () => {
    setLoading(true)
    markAttendanceSecretary(token, attendance)
      .then(_ => {callCoursesAtSchool();toast.success("Attendance successfully updated!")})
  }

  return (
    <SecretaryLayout>
      <h1 className="text-center">Please choose day and course to view the approved attendance</h1>
      <p className="text-warning text-center">Please remember this a private app and school year runs from Dec 1st to Dec 11th, non-weekends</p>
      <p className="text-center text-success"><small>Test Data for PM team: All dates from dec 1st to dec 4th are approved without you having to go mark attendances as a teacher.</small></p>
      <div className="row">
        <div className="col-3 picker text-left">
          <DatePicker 
            date={date}
            setDate={(d) => {setShow(false);setDate(moment(d))}}
          />
        </div>
        <div className="col-3 text-left">
          <select name="grade" id="grade" onChange={onGradeChange}>
            <option >Please select grade</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="col-3 course-select text-left">
         {!loading && courses && showCourse && <select value={selectedCourse} name="course" onChange={(e) => {setShow(false);setSelectedCourse(e.target.value)}} id="">
            <option value="">Please select a course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        }
        </div>
      </div>
      <div className="text-center mt-3 mb-4">
      <button disabled={show} className="btn btn-dark" onClick={handleClick}>Submit selection</button>
      </div>
      <p className="text-center text-danger mt-2">{error}</p>
      <hr></hr>
      { show && !attendance.length && <p className="text-center">There is no approved attendance. Please contact teacher if attendance was expected by now.</p> }
      {show && !!attendance.length &&
      <>
        <h3 className="text-center mb-3">Edit {attendance[0].course.instructor.name}'s Attendance</h3>
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
      <div className="mt-3 text-center"><button disabled={!checkAllStudentChecked() || loading} className="btn btn-dark text-center" onClick={submitEdit}>Submit Attendance</button></div>
     </> 
    }
    </SecretaryLayout>
     
  );
};

export default SecretaryAll;
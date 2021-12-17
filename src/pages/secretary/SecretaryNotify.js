import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify'

import { useAuth } from '../../context/auth/AuthState'

import { coursesAtSchool, getNotNotified, sendEmail  } from '../../api'

import SecretaryLayout from '../../components/SecretaryLayout'
import NotifyRow from '../../components/NotifyRow';

const SecretaryNotify = () => {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState()
  const [courses, setCourses] = useState([])
  const [show, setShow] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState()
  const [error, setError] = useState('')
  const [notificationList, setNotificationList] = useState([])
  const [showCourse, setShowCourse] = useState(false)



  const callCoursesAtSchool = (grade) => {
    setLoading(true)
    coursesAtSchool(token, user.school._id, grade)
    .then(res => {
      setLoading(false)    
      setCourses(res.data.courses)
      setShowCourse(true)
    })
    .catch(err => {
      setLoading(false)
    })
  }

  const onGradeChange = (e) => {
    setShowCourse(false)
    const grade = parseInt(e.target.value)
    if(isNaN(grade)) return
    callCoursesAtSchool(grade)

  }

  
  const handleClick = () => {
    if (!selectedCourse) {
      return setError('Please choose a Grade and Course.')
    }
    if(error) setError('')
    getNotNotified(token, selectedCourse)
      .then(res => {
        setShow(true)
        setNotificationList(res.data.attendance)
      })
  }

  //aId to mark the attendance email sent field as true, student and course to create email body
  const handleNotify = (attendanceId, student, course, status) => {
    if(window.confirm('Please confirm you want to send an email to this students parents')) {
      sendEmail(token, course, attendanceId, student, status)
        .then(res => {
          toast.warn('Email successfully sent to parent!')
          getNotNotified(token, selectedCourse)
            .then(res => {
              setShow(true)
              setNotificationList(res.data.attendance)  //refresh list
          })

        })
        .catch()
    }
  }


const renderList = () => {
  return notificationList.map(n => <NotifyRow course={n.course} date={n.day} handleClick={handleNotify} key={n._id} attendanceId={n._id} student={n.student} status={n.status} />)
}

  return (
    <SecretaryLayout>
      <h3 className="text-center mb-4">Please choose course to view absents and lates requiring notifications to parents.</h3>
      <div className="col text-center">
          <select name="grade" id="grade" onChange={onGradeChange}>
            <option >Please select grade</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      <div className="col text-center course-select">
         {!loading && courses && showCourse && <select value={selectedCourse} name="course" onChange={(e) => {setShow(false);setSelectedCourse(e.target.value)}} id="">
            <option value="">Please select a course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        }
      </div>
      <div className="text-center mt-3 mb-4">
        <button disabled={show} className="btn btn-dark" onClick={handleClick}>Submit selection</button>
      </div>
      <p className="text-center text-danger mt-2">{error}</p>
      <hr></hr>
      { show && !notificationList.length && <p className="text-center">There are no absents or lates requiring attention for this class</p> }
      {show && notificationList.length >= 1 &&
      <>
        <h3 className="text-center mb-3">Edit</h3>
        <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Student #</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Grade</th>
            <th scope="col">Period (time)</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Email parent</th>
          </tr>
        </thead>
        <tbody>
         { renderList() }
        </tbody>
      </table>  
     </> 
    }
    </SecretaryLayout>
     
  );
};

export default SecretaryNotify;
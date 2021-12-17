import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

import { useAttendance } from '../../context/attendance/AttendanceState'
import { useAuth } from '../../context/auth/AuthState'
import { getStudentAttendanceForDay, getStudentAttendance, notifyByParent } from '../../api'

import DatePicker from '../../components/shared/DatePicker'

import './childCalendar.css'


const ChildrenCalendar = ({ history }) => {
  const { setCurrentDate, currentDate, studentAttendanceForDay, setStudentAttendanceForDay } = useAttendance()
  const { token } = useAuth()
  const { id } = useParams()
  const [allDates, setAllDates] = useState([])
  const [markedDates, setMarkedDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [today, setToday] = useState(moment('2020-12-07 12:00'))



  useEffect(() => {
   getAllRecords()
  }, [id, token])

  useEffect(() => {
    setMarkedDates(allDates.filter(d => (d.status === 'late' || d.status === 'absent') && d.secretaryApproved ))
  }, [allDates, setAllDates])

  const getAllRecords = () => {
    getStudentAttendance(token, id)
    .then(res => {
      setAllDates(res.data.attendances)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    setStudentAttendanceForDay([])
    setLoading(true)
  }, [])

  const handleChange = (date) => {
    setCurrentDate(moment(date))
    setStudentAttendanceForDay([])
    setLoading(true)
  }

  const submitDate = () => {
    getStudentAttendanceForDay(token, currentDate, id)
      .then(res => {
        setStudentAttendanceForDay(res.data.attendances)
        setLoading(false)
       // history.push(`/parent/child/${id}/attendance`)
      })
      .catch(err => console.log(err))
  }

  const highlightWithRanges = () => {
    const dates = markedDates.map(md => new Date(moment(md.day).toDate()))
    return [
      {
        "react-datepicker__day--highlighted-custom-1": dates
      }
    ]
  }

  const renderClassDetails = () => {
    return studentAttendanceForDay.map(s => 
      <div className={`class-container ${s.secretaryApproved && s.status} `} key={s._id}>
        <div  className={`card mb-2}`} >
          <div className="card-body">
            <h4 className="card-title">{s.course.name}</h4>
            <h5 className="card-title">{s.course.instructor.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Period: {s.course.period}</h6>
            <p className="card-text">Start time: {moment(s.course.startTime).format('HH:mm')}</p>
            <p className="card-text">End time: {moment(s.course.endTime).format('HH:mm')}</p>
            { s.status === 'notmarked' && <><p><button onClick={() => notify('late', s._id, s.course)} className="btn btn-warning">Notify Late</button></p> 
            <p><button onClick={() => notify('absent', s._id, s.course)} className="btn btn-danger">Notify absent</button></p>
            </>}
          </div>
        </div>
      </div>
    )
  }

  const notify = (status, attendanceId, course) => {
    //check if same day
    const isSameDay = moment(currentDate).month() === moment(today).month() && moment(currentDate).day() === moment(today).day() 
    //make sure course didnt already start
    const courseStarted = moment(course.startTime).minutes() + moment(course.startTime).hours() * 60 < moment(today).minutes() + moment(today).hours() * 60
   
    if (isSameDay && courseStarted) {
      return toast.error('Sorry that course has already started.')
    }



    let isConfirmed = window.confirm('Please confirm status of ' + status + ' for date ' + moment(currentDate).format('MMM Do yyyy'))

    if (isConfirmed) {
      notifyByParent(token, attendanceId, status)
        .then(_ => { getAllRecords(); submitDate(); toast.success('Secretary has been notified. Please contact administration if this status needs to be altered.') })
        .catch(err => toast.error(err))
    }
  }


  return (
    <div className="container">
      <h3 className="text-center mt-3">{ allDates.length && allDates[0].student.name } | Attendance Records.</h3>
      <div className="row">
        <div className="col">
        <p className="text-center mt-3"><strong>This is a private app. For simplicity, school year is from Dec 1st to Dec 11th 2020, weekends off.</strong></p>
        <p className="mx-auto text-center mt-5">Dates highlighted in <span className="legend-late-calendar"></span> within calendar specify a late or absence or both. Please select date for full details. </p>
          <div className="date-container mt-5">
            <label htmlFor="dcont">Click here to open calendar</label>
            <div id="dcont">
            <DatePicker 
              date={currentDate}
              setDate={handleChange}
              highlightWithRanges={highlightWithRanges()}
            />
            </div>
           
          </div>
          <div className="row">
            <div className="col mt-5 text-center">
            {!loading && studentAttendanceForDay && studentAttendanceForDay.length === 0 && <p className="alert alert-danger mb-5">Your child has no classes on that specified day</p>}
              <div className="calendar-info">
              <p className="selected-date">Current date:  <strong>{today.format('MMM Do yyyy HH:mm')}</strong>  </p>
              <p className="selected-date mb-4">Selected date:  <strong>{currentDate.format('MMM Do yyyy')}</strong>  </p>
              <button className="btn btn-primary ml-5 mb-3" onClick={submitDate}> View selected date details</button> <br></br>
              <hr/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
        
          {studentAttendanceForDay && !!studentAttendanceForDay.length && renderClassDetails()}
        </div>
        <div className="col text-center">
          {studentAttendanceForDay && !!studentAttendanceForDay.length &&<>
          <p><span className="legend-present"></span> border indicates present </p>
          <p><span className="legend-absent"></span> border indicates absent </p>
          <p><span className="legend-late"></span> border indicates late </p>
          <p>If no borders, classes did not yet occur </p>
          </>}
        </div>
      </div>
    </div>
  
  );
};

export default ChildrenCalendar;
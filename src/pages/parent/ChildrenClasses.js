import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useParams, Link } from 'react-router-dom'


import { useAttendance } from '../../context/attendance/AttendanceState'

import { useAuth } from '../../context/auth/AuthState'

const ChildrenClasses = () => {
  const { currentDate, studentAttendanceForDay } = useAttendance()
  const { id } = useParams()
  const { token } = useAuth()

  useEffect(() => {
  
  })
  if(!studentAttendanceForDay || !studentAttendanceForDay[0] || !studentAttendanceForDay[0].student) return <h1>Something went wrong...Please go back to parent home and re-select</h1>
  return (
    <div className="container">
        <div className="row">
          <div className="col">
          <p className="p-3">{studentAttendanceForDay && studentAttendanceForDay[0].student && (studentAttendanceForDay[0].student.name + '|  ' + studentAttendanceForDay[0].student.school.name) }</p>
          </div>
          <div className="col">
            <p className="p-3">Selected date: {moment(currentDate).format('Mo D yyyy')}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">

          </div>

        </div>
        <Link className="btn btn-secondary" to={`/parent/child/${id}`}>Back to date selection</Link>
    </div>
  );
};

export default ChildrenClasses;
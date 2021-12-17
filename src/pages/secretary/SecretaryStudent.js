import React, { useState } from 'react';


import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth/AuthState'

import RecordRow from '../../components/RecordRow'
import SecretaryLayout from '../../components/SecretaryLayout'
import { getStudentRecord, markAttendanceSecretary } from '../../api'

const SecretaryStudent = () => {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState()
  const [account, setAccount] = useState('')
  const [records, setRecords] = useState([])



  const checkAllStudentChecked = () => records.every(a => a.status !== 'notmarked') 
  const handleChange = (e, attendanceId) => {
    const currentAttendance = [...records]
    const idx = currentAttendance.findIndex(a => a._id === attendanceId)
    const att = currentAttendance.find(a => a._id === attendanceId)
    att.status = e.target.checked ? e.target.value : 'notmarked'
    currentAttendance[idx] = att

    setRecords(currentAttendance)
  }
  const renderStudents = () => 
    records.map(a => <RecordRow 
      attendance={a} 
      status={a.status} 
      key={a._id}  
      student={a.student} 
      course={a.course} 
      handleChange={handleChange} 
    />) 

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!account) {
      toast.error('Please enter the students account #')
    }
    setLoading(true)
    getStudentRecord(token, account, user.school._id)
      .then(res => {
        setLoading(false)
        setRecords(res.data.records)
      })
      .catch(err => { setLoading(false); toast.error(err) })

  }

  const submitEdit = () => {
    setLoading(true)
    markAttendanceSecretary(token, records)
      .then(_ => {toast.success(`Records for account ${records[0].student.account} updated successfully.`)})
  }

  return (
    <SecretaryLayout>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Account #" className="form-control" value={account} onChange={(e) => setAccount(e.target.value)} />
          <div className="text-center mt-3">
            <button className="btn btn-dark">Submit</button>
          </div>
        </div>
      </form>
      {!loading && records.length > 0 && 
      <>
        <h3 className="text-center mb-3">View / Edit {records[0].student.name}'s (Account: {records[0].student.name}) Attendance records</h3>
        <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Course</th>
            <th scope="col">Period</th>
            <th scope="col">Instructor</th>
            <th scope="col">Present</th>
            <th scope="col">Late</th>
            <th scope="col">Absent</th>
          </tr>
        </thead>
        <tbody>
         { !loading && !!records.length && renderStudents() }
        </tbody>
      </table>  
      <div className="mt-3 text-center"><button disabled={loading || !checkAllStudentChecked()} className="btn btn-dark text-center" onClick={submitEdit}>Submit Records</button></div>
     </> }
    </SecretaryLayout>
  );
};

export default SecretaryStudent;
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'

import { useAuth } from '../../context/auth/AuthState'

import { coursesAtSchool, registerSupplyTeacher  } from '../../api'

import SecretaryLayout from '../../components/SecretaryLayout'
import DatePicker from '../../components/shared/DatePicker'



const SecretarySupply = ({ history }) => {
  const { token, user } = useAuth()
  const [loading, setLoading] = useState()
  const [courses, setCourses] = useState([])
  const [values, setValues] = useState({
    name: '',
    password: '',
    courses: [],
    schools: [user.school._id],
    account: ''
  })
  const [showCourse, setShowCourse] = useState(false)

  useEffect(() => {
    setValues({...values, account: generateAccount()})
  }, [])

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


  const generateAccount = () => {
    let acc = "4312".split('')
    let randomLettersAndStuff = "mbkjirlyjlhkb90438590347869347yhjnnknbhfko9aut9outj".split('');

    for (let i = 4; i < 10; i++) {
      let idx = Math.round(Math.random() * randomLettersAndStuff.length)
      acc.push(randomLettersAndStuff[idx])
    }

    return acc.join('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!values.name || !values.password || !values.courses.length) {
      return toast.error('Please provide all fields.')
    }
    registerSupplyTeacher(token, values)
      .then(res => {
        toast.success("Supply teacher successfully registered!")
        history.push('/secretary')
      })
      .catch(err => toast.error('A supply teacher has already been assigned to that course'))
  }

  return (
    <SecretaryLayout>
      <div className="supply-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Name" onChange={(e) => setValues({ ...values, name: e.target.value })} className="form-control"/>
        </div>
        <label htmlFor="account">Account number</label>
        <div className="form-group">
          <input type="text" id="account" value={values.account}  name="name" placeholder="Name" className="form-control"/>
        </div>
        <div className="form-group">
          <input type="text"   name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder="Password" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade </label>
        <select className="form-control" name="grade" id="grade" onChange={onGradeChange}>
            <option >Please select grade</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        {!loading && !!courses.length && showCourse && <div className="form-group"><select className="form-control mb-3" value={values.course} name="course" onChange={(e) => setValues({ ...values, courses: [e.target.value] }) } id="">
            <option value="">Please select a course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select></div>
        }
        <button type="submit" class="btn btn-dark">Submit</button>
      </form>
     
      </div>
    </SecretaryLayout>
     
  );
};

export default SecretarySupply;
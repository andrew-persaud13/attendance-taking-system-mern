import React, { useEffect, useState } from 'react';
// import moment from 'moment'
import {useAuth } from '../../context/auth/AuthState'
import { getCourses } from '../../api'
// import StudentRow from '../../components/StudentRow';
import CourseCard from '../../components/CourseCard';

const TeacherHome = () => {
  const { token } = useAuth()
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCourses(token)
    .then(res => {
      setLoading(false)
      setTeacher(res.data.teacher)
    })
    .catch(err => {
      setLoading(false)
      console.log(err);
    })
  }, [])

  const renderCourses = () => {
    return teacher.courses.map(course => 
      <div className="col-4" key={course._id}>
        <CourseCard course={course}  />
      </div>
      
    )
  }

  if(loading || (!loading && !teacher)) return  <h1>Loading...</h1>
  return (
    <div className="container p-5">
      <div className="row">
        {renderCourses()}
        </div>
      </div>
  );
};

export default TeacherHome;
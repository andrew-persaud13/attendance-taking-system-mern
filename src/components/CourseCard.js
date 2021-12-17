import React from 'react';
import { Link } from 'react-router-dom'

import moment from 'moment'

import './children-card.css'

import logo from './schoolpic.jpg'
import logo1 from './schoolpic2.jpg'
import logo2 from './schoolpic3.jpg'

const CourseCard = ({ course }) => {

  const chooseLogo = () => {
    switch(course.school.name) {
      case 'Lassonde High School':
        return logo
      case 'Hogwarts':
        return logo1
      default:
        return logo2
    }
  }

  return (
    <div className="card">
      <img className="card-img-top" src={chooseLogo()} />
      <div className="card-body">
        <h5 className="card-title">School: {course.school.name}</h5>
         <p className="card-text">{course.name}</p>
          <p className="card-text">Period: {course.period}</p>
          <p className="card-text">Start Time: {moment(course.startTime).format('HH:mm')}</p>
          <p className="card-text">End Time: {moment(course.endTime).format('HH:mm')}</p>
        <Link to={`/teacher/course/${course._id}`} className="btn btn-primary">Attendance</Link>
      </div>
    </div>
  );
};

export default CourseCard;
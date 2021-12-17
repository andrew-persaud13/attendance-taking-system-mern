import React from 'react';
import moment from 'moment'

const CourseOverviewRow = ({ course, handleClick, date, getCounts }) => {
  return (
    <tr>
      <th scope="row">{course?.instructor?.name}</th>
      <td>{course?.name}</td>
      <td>{course?.period}</td>
      <td>{date}</td>
      <td>{getCounts(course._id, 'present', date)}</td>
      <td>{getCounts(course._id, 'late', date)}</td>
      <td>{getCounts(course._id, 'absent', date)}</td>
      <td><button onClick={() => handleClick(course?._id, date) } className="btn btn-dark">View attendance</button></td>
    </tr>
  );
};

export default CourseOverviewRow;
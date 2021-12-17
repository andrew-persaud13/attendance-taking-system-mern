import React   from 'react';
import moment from 'moment'

const RecordRow = ({ attendance, course, handleChange = (e) => {}, status }) => {

  return (
    <tr>
        <th scope="row">{moment(attendance.day).format('yyyy/M/D')}</th>
        <td>{ course.name }</td>
        <td>{ course.period }</td>
        <td>{ course.instructor.name }</td>
        <td><input type="checkbox"  value="present" checked={status === 'present'}  onChange={(e) => handleChange(e, attendance._id)}/></td>
        <td><input type="checkbox"  value="late"  checked={status === 'late'}  onChange={(e) => handleChange(e, attendance._id)}/></td>
        <td><input type="checkbox" value="absent"  checked={status === 'absent'}    onChange={(e) => handleChange(e, attendance._id)}/></td>
    </tr>
  );
};

export default RecordRow
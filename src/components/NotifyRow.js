import React   from 'react';
import moment from 'moment'
const NotifyRow = ({handleClick, student, status, attendanceId, course, date}) => {

  return (
    <tr>
        <th scope="row">{student.account}</th>
        <td>{ student.name }</td>
        <td>{course.name}</td>
        <td>{student.grade}</td>
        <td>{course.period} ({moment(course.startTime).format('HH:mm')} - {moment(course.endTime).format('HH:mm')})</td>
        <td>{moment(date).format('yyyy/M/D')}</td>
        <td>{status}</td>
        <td><button onClick={() => handleClick(attendanceId, student, course, status )} className="btn btn-info">Email Parent</button></td>
    </tr>
  );
};

export default NotifyRow
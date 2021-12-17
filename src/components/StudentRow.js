import React   from 'react';

const StudentRow = ({ student, handleChange = (e) => {}, status }) => {

  return (
    <tr>
        <th scope="row">{student.account}</th>
        <td>{ student.name }</td>
        <td><input type="checkbox"  value="present" checked={status === 'present'}  onChange={(e) => handleChange(e, student._id)}/></td>
        <td><input type="checkbox"  value="late"  checked={status === 'late'}  onChange={(e) => handleChange(e, student._id)}/></td>
        <td><input type="checkbox" value="absent"  checked={status === 'absent'}    onChange={(e) => handleChange(e, student._id)}/></td>
    </tr>
  );
};

export default StudentRow
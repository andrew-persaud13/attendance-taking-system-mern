import React from 'react';
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { useAuth } from '../context/auth/AuthState'

import './seclayout.css'

const SecretaryLayout = ({ children }) => {
  const { user } = useAuth()
  return (
    <div className="container-fluid mt-4">
      <div className="sec-header text-center mb-3">
        <div className="card" style={{width: '18rem'}}>
           <div className="card-body">
            <h5 className="card-title">Your school: {user.school.name}</h5>
            <p className="card-text">Current Date: {moment('2020-12-07 12:00').format('MMM Do yyyy HH:mm')}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <ul className="list-group">
            <li className="list-group-item"><NavLink exact className="sec-link" to="/secretary">Approve attendances</NavLink></li>
            <li className="list-group-item"><NavLink exact className="sec-link" to="/secretary/all">Edit Approved Attendances</NavLink></li>
            <li className="list-group-item"><NavLink exact className="sec-link" to="/secretary/student">View Student Records</NavLink></li>
            <li className="list-group-item"><NavLink exact className="sec-link" to="/secretary/notify">Notify parents</NavLink></li>
            <li className="list-group-item"><NavLink exact className="sec-link" to="/secretary/supply">Register supply teacher</NavLink></li>
          </ul>
        </div>
        <div className="col-10">
          {children}
        </div>
      </div>
      
    </div>
  );
};

export default SecretaryLayout;
import React from 'react';
import { Link } from 'react-router-dom'

import './children-card.css'

import logo from './image.jpg'
const ChildrenCard = ({ child }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={logo} />
      <div className="card-body">
        <h5 className="card-title">{child.name}</h5>
         <p className="card-text">Student number: {child.account}</p>
          <p>School: {child.school.name}</p>
         <p className="card-text">Grade: {child.grade}</p>
        <Link to={`/parent/child/${child._id}`} className="btn btn-primary">See monthly attendance</Link>
      </div>
    </div>
  );
};

export default ChildrenCard;
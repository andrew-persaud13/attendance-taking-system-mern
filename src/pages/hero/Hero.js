import React, { useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom'
//import { useAuth } from '../../context/auth/AuthState'

import './hero.css'

const Hero = (props) => {
  
  return (
    <header className="header">
      <div className="text-box">
        <h1 className="hero-heading">
          <span className="hero-heading-main mb-5">Lassonde School Board</span>
          <span className="hero-heading-secondary">Choose your portal</span>
        </h1>

         <div className="container hero-links-box">
          <div className="row">
            <div className="col-4 "><Link className=" hero-links hero-links-blue" to="/login/parent">Parents</Link></div>
            <div className="col-4 "><Link className=" hero-links hero-links-white" to="/login/teacher">Teachers</Link></div>
            <div className="col-4 "><Link className="hero-links hero-links-blue" to="/login/secretary">Secretary</Link></div>
          </div>
        </div> 
      </div>
     
    </header>
  );
};

export default Hero;
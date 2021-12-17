import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/auth/AuthState'



const Header = () => {


  const { isAuth, logout, role, name } = useAuth()



  return (
    
    <nav className ="navbar navbar-expand-lg navbar-light bg-light">
      <Link className ="navbar-brand title " to="/">School Management System </Link>
      <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className ="navbar-toggler-icon"></span>
      </button>
    
      <div className ="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className ="navbar-nav ml-auto ">
        
          {/* <li className="nav-item active">
            <Link className="nav-link" to="/secretary">Secretary Home</Link>
          </li> */}
          {/* <li className ="nav-item">
            <Link className ="nav-link" to="/login">Login</Link>
          </li>
          <li className ="nav-item">
            <Link className ="nav-link" to="/register">Register</Link>
          </li> */}
          {/* <li className ="nav-item dropdown">
            <Link className ="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Manage
            </Link>
            <div className ="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className ="dropdown-item" to="#">Action</Link>
              <Link className ="dropdown-item" to="#">Another action</Link>
              <div className ="dropdown-divider"></div>
              <Link className ="dropdown-item" to="#">Something else here</Link>
            </div>
          </li> */}
             
            
     
              {isAuth && 
              <>
                <li className ="nav-item"> <Link to="#"  className ="nav-link">{`Welcome ${name}`}</Link></li> 

                {role === 'teacher' && <li className ="nav-item active">
                    <Link className ="nav-link" to="/teacher">Teacher Home   <span className ="sr-only">(current)</span></Link>
                </li> }
                {role === 'secretary' && <li className ="nav-item active">
                  <Link className ="nav-link" to="/secretary">Secretary Home <span className ="sr-only">(current)</span></Link>
                </li> }
                {role === 'parent' && <li className ="nav-item active">
                  <Link className ="nav-link" to="/parent">Parent Home <span className ="sr-only">(current)</span></Link>
                </li> } 

                <li className ="nav-item"> <Link to="#"  className ="nav-link"> | </Link></li>
                <li className ="nav-item"> <Link to="#" onClick={logout} className ="nav-link">Logout</Link></li>
             
              </>
              }
           
        </ul>
        {/* <form className ="form-inline my-2 my-lg-0">
          <input className ="form-control mr-sm-2 sm-search" type="search" placeholder="does it have a search?" aria-label="Search"/>
          <button className ="btn btn-sm-main btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </div>
    </nav>
  );
};

export default Header;
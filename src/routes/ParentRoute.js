import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthState'

const ParentRoute = ({ component: Component, ...rest }) => {
  const { isAuth, role } = useAuth()
 
  return (
    <Route
      {...rest}
      render={props =>
        (!isAuth || !(role === 'parent')) ? (
          <div><Link className="btn btn-secondary" to="/">Go back to portal selection</Link></div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};


export default ParentRoute
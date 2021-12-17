import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthState'

const SecretaryRoute = ({ component: Component, ...rest }) => {
  const { isAuth, role } = useAuth()
 
  return isAuth && (role === 'secretary') ? (
    <Route {...rest} component={Component} />
  ) : (
    <div><Link className="btn btn-secondary" to="/">Go back to portal selection</Link></div>
  )
};


export default SecretaryRoute
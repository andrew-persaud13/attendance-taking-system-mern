import React, { useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom'

import { useAuth } from '../context/auth/AuthState'
import LoginForm from '../components/auth/LoginForm'

import { login  } from '../api'



import './login.css'

const Login = ({ history }) => {
  const { loginSuccess, isAuth, role: authRole } = useAuth()
  const { role } = useParams()
  const [values, setValues] = useState({
    account: '',
    password: '',
    role,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if(isAuth) {
      history.push(`/${authRole}`)
    }
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    login(values)
      .then(res => {
        const token = res.data.token
        localStorage.setItem('token', token)
        loginSuccess(token, res.data.role, res.data.name, res.data._id, res.data.account, res.data.user)
        console.log('Login success', res.data.user);
        setLoading(false)
        setError(null)
        setShouldRedirect(true)
      })
      .catch(err => {
        setLoading(false)
        setError(err)
      })
  }

  if(shouldRedirect) {
    if (role === 'secretary')  return <Redirect to="/secretary" />
    if (role === 'teacher')  return <Redirect to="/teacher" />
    if (role === 'parent')  return <Redirect to="/parent" />
  }

  if(loading) return 'Loading...'
  if(!loading || !isAuth) return (
    <div className="login-form-container">
      <LoginForm disabled={loading} onSubmit={handleSubmit} role={role} values={values} error={error} setInput={(e) => setValues({ ...values, [e.target.name] : e.target.value })} />
    </div>
  );
};

export default Login;
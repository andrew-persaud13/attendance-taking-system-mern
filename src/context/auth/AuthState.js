import React, { createContext, useReducer, useContext } from 'react'
import jwt from 'jsonwebtoken'

import authReducer from './authReducer'
import { getLoggedInUser } from '../../api'


const AuthContext = createContext()



const AuthState = props => {
 
  const initState = {
    token: localStorage.getItem('token') || null,
    isAuth: false,
    role: '',
    name: '',
    _id: '',
    account: '', 
    user: null
  }

  const [state, dispatch] = useReducer(authReducer, initState)

  const loginSuccess = (token, role, name, _id, account, user) => dispatch({ type: 'LOGIN_SUCCESS', payload: { token, role, name, _id, account, user } })

  const logout = () => dispatch({type: 'LOGOUT'})

  const checkLoggedIn = async () => {

    const token = localStorage.getItem('token')
 
    if(!token) return dispatch({type: 'LOGOUT'})

    const decoded = jwt.decode(token)
    
    try {
      const response = await getLoggedInUser(token, decoded.role)
      const user = response.data
    
      if(!user) return dispatch({type: 'LOGOUT'})
      
      const { role, name, _id, account } = user

      dispatch({ type: 'AUTHENTICATED', payload: { token, role, name, _id, account, user } })
     
    } catch(err) {
      dispatch({type: 'LOGOUT'})
    }
  }




  const store = {
    token: state.token,
    isAuth: state.isAuth,
    role: state.role,
    name: state.name,
    _id: state._id,
    user: state.user,
    loginSuccess,
    logout,
    checkLoggedIn
  }

  return (
    <AuthContext.Provider value={store}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

export const useAuth = () => useContext(AuthContext)
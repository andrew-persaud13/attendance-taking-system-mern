
const init = {
  token: null,
  isAuth: false,
  role: '',
  name: '',
  _id: '',
  account: '',
  user: null
}

const authReducer = (state = init, action) => {
  switch(action.type) {
    case 'AUTHENTICATED':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        name: action.payload.name,
        isAuth: !!action.payload.token,
        _id: action.payload._id,
        account: action.payload.account,
        user: action.payload.user
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...init
      }
    default:
      return state
  }
}

export default authReducer
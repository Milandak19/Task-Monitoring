let loginStatus = false
if(localStorage.getItem('access_token')) {
  loginStatus = true
} else {
  loginStatus = false
}

const initialState = {
  loginStatus,
  registerStatus: false
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case 'LOGINSTATUS/LOGIN':
      localStorage.setItem('access_token', payload)
      return {...state, loginStatus: true}
    case 'LOGINSTATUS/LOGOUT':
      localStorage.removeItem('access_token')
      return {...state, loginStatus: false}
    case 'LOGINSTATUS/REGISTER':
      return {...state, registerStatus: payload}
    default:
      return state
  }
}
const initialState = {
  name: '',
  email: '',
  userType: '',
  secretKey: ''
}

export default function reducer(state= initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER/SETUSERTYPE':
      return {...state, userType: payload}
    case 'USER/SETEMAIL':
      return {...state, email: payload}
    case 'USER/SETNAME':
      return {...state, name: payload}
    case 'USER/SETSECRETKEY':
      return {...state, secretKey: payload}
    default:
      return state
  }
}
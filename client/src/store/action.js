import axios from '../config/axios'

export function setLoginTrue(payload) {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/LOGIN', payload })
  }
}

export function setLoginFalse() {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/LOGOUT' })
  }
}

export function setRegisterStatus (payload) {
  return dispatch => {
    dispatch({ type: 'LOGINSTATUS/REGISTER', payload })
  }
}

export function setTask(payload) {
  return dispatch => {
    dispatch({ type: 'TASK/SETTASK', payload })
  }
}

export function setTasks(payload) {
  return dispatch => {
    dispatch({ type: 'TASK/SETTASKS', payload })
  }
}

export function setUserName(payload) {
  return dispatch => {
    dispatch({ type: 'USER/SETNAME', payload })
  }
}

export function setUserSecretKey(payload) {
  return dispatch => {
    dispatch({ type: 'USER/SETSECRETKEY', payload })
  }
}

export function setUserEmail(payload) {
  return dispatch => {
    dispatch({ type: 'USER/SETEMAIL', payload })
  }
}

export function setUserType(payload) {
  return dispatch => {
    dispatch({ type: 'USER/SETUSERTYPE', payload })
  }
}

export function fetchUser() {
  return async dispatch => {
    try {
      const response = await axios().get('/user')
      const {data} = response
      dispatch(setUserEmail(data.email))
      dispatch(setUserName(data.name))
      dispatch(setUserType(data.userType))
      if(data.userType === 'manager') dispatch(setUserSecretKey(data.secretKey))
    } catch (error) {
      console.log(error)      
    }
  }
}

export function login(payload) {
  return async dispatch => {
    try {
      const response = await axios({requiresAuth: false, }).post('/login', payload)
      dispatch(fetchUser)
      dispatch(setLoginTrue(response.data.access_token))
    } catch (error) {
      console.log(error)  
    }
  }
}

export function register (payload) {
  return async dispatch => {
    try {
      await axios({ requiresAuth: false }).post('/register', payload)
      dispatch(setRegisterStatus(true))
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchTask(payload) {
  return async dispatch => {
    try {
      const response = await axios().get(`/task/${payload}`)
      const {data} = response
      dispatch(setTask(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchTasks() {
  return async dispatch => {
    try {
      const response = await axios().get('/task')
      const {data} = response
      dispatch(setTasks(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export function editTask(id,payload) {
  return async dispatch => {
    try {
      await axios().put(`/task/${id}`, payload)
      await dispatch(fetchTasks())
    } catch (error) {
      console.log(error)
    }
  }
}

export function editStatusTask(id,payload) {
  return async dispatch => {
    try {
      console.log(id)
      await axios().patch(`/task/${id}`, payload)
      await dispatch(fetchTasks())
    } catch (error) {
      console.log(error)
    }
  }
}

export function addTask(payload) {
  return async dispatch => {
    try {
      await axios().post('/task', payload)
      await dispatch(fetchTasks())
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteTask(payload) {
  return async dispatch => {
    try {
      await axios().delete(`/task/${payload}`)
      await dispatch(fetchTasks())
    } catch (error) {
      console.log(error)
    }
  }
}
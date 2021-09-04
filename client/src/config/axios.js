import axios from 'axios'

const instance = ({ requiresAuth = true, contentType = 'application/json' } = {}) => {
  const options = {
    headers: {
      'Content-Type': contentType
    }
  }
  options.baseURL = process.env.REACT_APP_APIURL || 'http://localhost:3001'
  if (requiresAuth) {
    options.headers.access_token = localStorage.getItem('access_token')
  }
  const instance = axios.create(options)
  return instance
}

export default instance
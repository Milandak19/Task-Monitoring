import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginStatus from './reducers/loginStatus'
import task from './reducers/task'
import user from './reducers/user'
import thunk from 'redux-thunk'

const mainReducer = combineReducers({
  loginStatus,
  task,
  user
})

const store = createStore(mainReducer, applyMiddleware(thunk))

export default store
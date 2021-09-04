import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './views/Login';
import Home from './views/Home'
import Register from './views/Register'

function App() {
  const loginStatus = useSelector(state => state.loginStatus.loginStatus)

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => loginStatus ? <Home/> : <Redirect to='/login'/> } />
        <Route path='/login' render={() => !loginStatus ? <Login/> : <Redirect to='/'/>} />
        <Route path='/register' render={() => !loginStatus ? <Register/> : <Redirect to='/'/>} />
      </Switch>
    </Router>
  );
}

export default App;

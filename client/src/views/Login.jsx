import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/action'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const [formValue, setFormValue] = useState({ email: '', password: '' })
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(formValue))
    setFormValue({...formValue, password: ''})
    if(loginStatus) history.push('/')
  }

  useEffect(() => {}, [loginStatus])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={formValue.email}
            onChange={(e) => setFormValue({...formValue , email: e.target.value})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={formValue.password}
            onChange={(e) => setFormValue({...formValue , password: e.target.value})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='#' onClick={(e) => history.push('/register')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
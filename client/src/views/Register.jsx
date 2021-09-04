import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, makeStyles, Container, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {register} from '../store/action';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [payload, setPayload] = useState({firstName: '', lastName: '', userType: '', email: '', password: '', secretKey: ''});

  const handleRadio = (e) => {
    setPayload({...payload, userType: e.target.value})
  };

  const registerHandle = (e) => {
    e.preventDefault()
    if(!payload.userType || !payload.firstName || !payload.lastName || !payload.email || !payload.password ) {
      console.log('error');
    } else {
      dispatch(register(payload))
      setPayload({...payload, userType: '', email: '', password: '', secretKey: '', firstName: '', lastName: ''})
      history.push('/login')
    }
  };

  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={payload.firstName}
                onChange={(e) => setPayload({...payload, firstName: e.target.value})}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={payload.lastName}
                onChange={(e) => setPayload({...payload, lastName: e.target.value})}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required>
                <FormLabel>Account Type:</FormLabel>
                <RadioGroup row aria-label="position" name="position" value={payload.userType} onChange={handleRadio}>
                  <FormControlLabel value='employee' control={<Radio color='primary' />} label="Employee"/>
                  <FormControlLabel value='manager' control={<Radio color='primary'/>} label="Manager"/>
                </RadioGroup>
              </FormControl>
            </Grid>
            {
              payload.userType === 'employee' ? (
                <Grid item xs={12}>
                  <TextField
                    value={payload.secretKey}
                    onChange={(e) => setPayload({...payload, secretKey: e.target.value})}
                    variant="outlined"
                    required
                    fullWidth
                    id="secretKey"
                    label="Secret Key Your Manager"
                    name="secret key"
                    autoComplete="secret key"
                    placeholder="$2b$10$5Z.A7RlHxDap0MpiZx4YeOrtpU4zeTcRFCuKxol/wZoEmz1J0kwdS"
                  />
                </Grid> ) : null
            }
            
            <Grid item xs={12}>
              <TextField
                value={payload.email}
                onChange={(e) => setPayload({...payload, email: e.target.value})}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={payload.password}
                onChange={(e) => setPayload({...payload, password: e.target.value})}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={registerHandle}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" onClick={() => history.push('/login')} variant="body2">
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
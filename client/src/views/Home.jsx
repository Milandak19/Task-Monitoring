import React, {useEffect, useState} from 'react'
import {Typography, makeStyles, Container, Input, InputLabel, InputAdornment, FormControl, Button, Fab, Grid} from '@material-ui/core'
import {lightBlue} from '@material-ui/core/colors'
import {useDispatch, useSelector} from 'react-redux'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {setLoginFalse, fetchTasks, fetchUser, addTask} from '../store/action'
import {useHistory} from 'react-router-dom'
import Task from '../components/Task'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: lightBlue[900],
    minHeight: 200,
    padding: 8,
  },
  title: {
    marginTop: 30,
    color: '#ffffff'
  },
  containerTwo: {
    backgroundColor: '#002f6c',
    color: '#ffffff',
    marginTop: -55,
    marginBottom: 50,
    padding: 10,
    paddingTop: 0,
    textAlign: 'center',
    width: '70%',
    minHeight: 500,
    maxHeight: 700,
    boxShadow: theme.shadows[5],
  },
  containerTasks: {
    maxHeight: 600,
    overflow: 'auto',
    "&::-webkit-scrollbar" : {
      width: 7
    },
    "&::-webkit-scrollbar-track" : {
      background: '#bdbdbd',
      borderRadius: 3
    },
    "&::-webkit-scrollbar-thumb": {
      background: '#002f6c',
      borderRadius: 3
    }
  },
  containerAdd: {
    padding: 5,
    borderRadius: 5
  },
  textInput: {
    color: '#ffffff',
    width: '95%'
  }
}))

function Home() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const [task, setTask] = useState('')
  const tasks = useSelector(state=> state.task.tasks)
  const user = useSelector(state=> state.user)

  const logOutHandler = () => {
    dispatch(setLoginFalse())
    history.push('/login')
  }

  const addTaskHandler = () => {
    dispatch(addTask({task, status: 'Back-Log'}))
    setTask('')
  }

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchUser())
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Container className={classes.container} maxWidth='xl'>
        <Typography variant='h3' align='center' className={classes.title}>Welcome, {user.name}</Typography>
      </Container>
      <Container className={classes.containerTwo}>
        <Container className={classes.containerAdd}>
        <Typography variant='h5'>Task</Typography>
        {
          user.userType === 'employee' ? (
            <FormControl fullWidth className={classes.textInput}>
              <InputLabel style={{ color: 'white' }} color='secondary'>Add Task</InputLabel>
              <Input value={task} onChange={(e) => setTask(e.target.value)} color='secondary' disableUnderline={false} style={{ color: 'white' }} autoComplete='off' endAdornment={
                <InputAdornment>
                  <Button style={{ color: 'white' }} endIcon={<AddCircleOutlineOutlinedIcon/>} type='submit' onClick={addTaskHandler}>
                    Add
                  </Button>
                </InputAdornment>
              }/>
            </FormControl>) : (
              <Grid container justifyContent="space-evenly">
                <Typography variant="subtitle1">Your Secret Key: </Typography>
                <Typography variant="subtitle2">{user.secretKey}</Typography>
              </Grid>
            )
        }
        </Container>
        <Container className={classes.containerTasks}>
          {
            tasks.map(item => (
              <Task item={item}/>
            ))
          }
        </Container>
      </Container>
      <Fab style={{ position: 'fixed', bottom: 20, left: 20, backgroundColor: 'red', color: 'white' }} onClick={logOutHandler}>
        <PowerSettingsNewIcon/>
      </Fab>
    </>
  )
}

export default Home

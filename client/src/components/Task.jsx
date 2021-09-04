import React, {useState} from 'react'
import {Container, Grid, Typography, ButtonGroup, IconButton, Tooltip} from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditAttributesTwoToneIcon from '@material-ui/icons/EditAttributesTwoTone';
import FormDialog from './Dialog';
import {useDispatch, useSelector} from 'react-redux'
import {editStatusTask, deleteTask, fetchTask} from '../store/action'
import './styles/task.css'

function Task({item}) {
  const userType = useSelector(state => state.user.userType)
  const dispatch = useDispatch()
  const [id, setId] = useState(0)
  const [open, setOpen] = useState(false)

  const editStatusTaskHandler = (status, idStatus) => {
    console.log(status, idStatus)
    switch (status) {
      case 'Back-Log':
        return dispatch(editStatusTask(idStatus,{status: 'To-Do'}))
      case 'To-Do':
        return dispatch(editStatusTask(idStatus,{status: 'Doing'}))
      case 'Doing':
        return dispatch(editStatusTask(idStatus,{status: 'Complete'}))
      case 'Complete':
        return dispatch(editStatusTask(idStatus,{status: 'Back-Log'}))
      default:
        break;
    }
  }

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id))
  }

  const editTaskHandler = (id) => {
    dispatch(fetchTask(id))
    setId(id)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

  console.log(userType)

  console.log(item);

  return (
    <>
      {
        userType === 'employee' ? (
          <Container className='containerTask'>
            <Grid container justifyContent='space-between'>
              <Typography variant='h6'>{item.task}</Typography>
              <Typography variant='caption'>{item.createdAt.split('T')[0]}</Typography>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography variant='body2'>{item.status}</Typography>
              <ButtonGroup className='controlButton' size="small" aria-label="small outlined button group" >
                <Tooltip title='Edit' arrow>
                  <IconButton color='primary' onClick={() => editTaskHandler(item.id)}><EditTwoToneIcon fontSize="small"/></IconButton>
                </Tooltip>
                <Tooltip title='Delete' arrow>
                <IconButton color='secondary' onClick={() => deleteTaskHandler(item.id)}><DeleteForeverTwoToneIcon fontSize="small"/></IconButton>
                </Tooltip>
                <Tooltip title='Change Status' arrow>
                <IconButton style={{ color: 'green' }} onClick={() => editStatusTaskHandler(item.status, item.id)}><EditAttributesTwoToneIcon fontSize="small"/></IconButton>
                </Tooltip>
              </ButtonGroup>
            </Grid>
            <FormDialog open={open} onClose={handleClose} id={id}/>
          </Container>) : (
            <Container className='containerTask'>
            <Grid container justifyContent='space-between'>
              <Typography variant='h6'>{item.task}</Typography>
              <Typography variant='caption'>{item.createdAt.split('T')[0]}</Typography>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography variant='body2'>{item.name}</Typography>
              <Typography>{item.status}</Typography>
            </Grid>
            <FormDialog open={open} onClose={handleClose} id={id}/>
          </Container>
          )
      }
    </>
)
}

export default Task

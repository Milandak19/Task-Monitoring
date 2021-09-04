import React, {useEffect, useState} from 'react';
import {Select, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import { fetchTask, editTask } from '../store/action';

export default function FormDialog({open, onClose, id}) {
  const dispatch = useDispatch()
  const task = useSelector(state => state.task.task)
  const [newTask, setNewTask] = useState(task)

  const editTaskHandler = () => {
    dispatch(editTask(id, newTask))
    onClose()
  }

  useEffect(() => {
    dispatch(fetchTask(id))
    // eslint-disable-next-line
  }, [id])
  
  useEffect(() => {
    setNewTask(task)
  }, [task])

  return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="task"
            label="Task"
            fullWidth
            value={newTask.task}
            onChange={(e) => setNewTask({...newTask, task: e.target.value})}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            fullWidth
          >
            <MenuItem value='Back-Log'>Back-Log</MenuItem>
            <MenuItem value='To-Do'>To-do</MenuItem>
            <MenuItem value='Doing'>Doing</MenuItem>
            <MenuItem value='Complete'>Complete</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTaskHandler} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}

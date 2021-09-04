const initialState = {
  tasks: [],
  task: {},
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case 'TASK/SETTASKS':
      return {...state, tasks: payload}
    case 'TASK/SETTASK':
      return {...state, task: payload}
    default:
      return state
  }
}
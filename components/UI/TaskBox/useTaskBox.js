import { useReducer } from 'react'
import {
  getLocalData,
  setLocalData,
  setExpiry,
  pastExpiry,
} from '../../../utils'

const internalReducer = ({ task, status }, { type, payload }) => {
  switch (type) {
    case 'updateText':
      return {
        task: payload.task,
        status: status,
      }
    case 'updateStatus':
      return {
        task: task,
        status: payload.status,
      }
    case 'setData':
      setLocalData(payload.localStorageName, payload.boxTasks)
      return {
        task: task,
        status: status,
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

function useTaskBox(
  { initialTask, initialStatus, localStorageName, taskNum },
  reducer = internalReducer
) {
  const [{ task, status }, dispatch] = useReducer(reducer, {
    task: initialTask,
    status: initialStatus,
  })

  const handleUpdateText = (task) => {
    dispatch({ type: 'updateText', payload: { task } })
  }

  const handleUpdateStatus = (status) => {
    let boxTasks = getLocalData(localStorageName)
    if (boxTasks && boxTasks[taskNum]) {
      boxTasks[taskNum].completed = status
      boxTasks[taskNum].expiry = setExpiry()

      dispatch({ type: 'setData', payload: { localStorageName, boxTasks } })
      dispatch({ type: 'updateStatus', payload: { status } })
    }
  }

  const setupData = (taskNum) => {
    let boxTasks = getLocalData(localStorageName)

    // if exists
    if (boxTasks && boxTasks[taskNum]) {
      //if its completed and past expiry - delete : else - load
      if (boxTasks[taskNum].completed && pastExpiry(boxTasks[taskNum].expiry)) {
        delete boxTasks[taskNum]
        dispatch({ type: 'setData', payload: { localStorageName, boxTasks } })
      } else {
        dispatch({
          type: 'updateText',
          payload: { task: boxTasks[taskNum].task },
        })
        dispatch({
          type: 'updateStatus',
          payload: { status: boxTasks[taskNum].completed },
        })
      }
    }
  }

  const onBlurHandler = (e) => {
    let boxTasks = getLocalData(localStorageName)
    if (!task) {
      delete boxTasks[taskNum]
    } else {
      const value = {
        task: task,
        completed: status,
        expiry: setExpiry(),
      }
      boxTasks[taskNum] = value
    }

    dispatch({ type: 'setData', payload: { localStorageName, boxTasks } })
    dispatch({ type: 'updateText', payload: { task: e.target.value } })
    dispatch({ type: 'updateStatus', payload: { status: false } })
  }

  return {
    task,
    status,
    handleUpdateText,
    handleUpdateStatus,
    setupData,
    onBlurHandler,
  }
}

useTaskBox.reducer = internalReducer
useTaskBox.types = {
  updateText: 'updateText',
  updateStatus: 'updateStatus',
}

export { useTaskBox }

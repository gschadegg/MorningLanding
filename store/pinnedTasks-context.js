import React, { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from '../utils/index'

import NotificationContext from './notification-context'
import PinnedTask from '../components/Drawer/PinnedTasks/PinnedTask'

// default context
const PinnedTasksContext = React.createContext({
  taskList: [],
  addTaskFunc: (newTask) => {},
  removeTaskFunc: (e) => {},
  updateCompletedStatus: (id, status) => {},
})

export const PinnedTasksContextProvider = (props) => {
  const [taskList, setTaskList] = useState([]) // array of components
  const notificationCTX = useContext(NotificationContext)

  //add single task to List
  const addTaskToList = (newTask) => {
    const newID = uuidv4()
    let newPinned = <PinnedTask key={newID} task={newTask} id={newID} />
    setTaskList((prevState) => [...prevState, newPinned])

    let localTaskList = getLocalData('ML-pinnedTasks')
    const taskObj = {
      name: newTask,
      completed: false,
      id: newID,
    }
    localTaskList = [...localTaskList, taskObj]
    setLocalData('ML-pinnedTasks', localTaskList)
  }
  const deleteTaskStorage = (id) => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    if (localTaskList) {
      let deleteIdx = localTaskList?.findIndex((task) => task.id === id)
      localTaskList.splice(deleteIdx, 1)
      console.log(localTaskList)
      setLocalData('ML-pinnedTasks', localTaskList)
    }
  }
  //removes single task from list
  const removeTaskFromList = (el) => {
    let idx = taskList?.findIndex((task) => task.props.id === el.id)
    let newList = taskList
    if (idx > -1 && idx < taskList.length) {
      newList.splice(idx, 1)
      setTaskList([...newList])
      deleteTaskStorage(el.id)
    } else {
      notificationCTX.setUpNotification(
        `We couldn't find that task to remove it!`,
        'error'
      )
    }
  }

  const updateCompletedStatus = async (id, status) => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    if (localTaskList) {
      const ttl = status ? setExpiry() : null
      let updateIdx = localTaskList?.findIndex((task) => task.id === id)
      localTaskList[updateIdx].completed = status
      localTaskList[updateIdx].expiry = ttl
      setLocalData('ML-pinnedTasks', localTaskList)
    } else {
      notificationCTX.setUpNotification(
        `We couldn't find that task to update it!`,
        'error'
      )
    }
  }

  useEffect(() => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    if (localTaskList) {
      const localList = localTaskList.map((task) => {
        if (task.completed && pastExpiry(task.expiry)) {
          deleteTaskStorage(task.id)
          return
        } else {
          return (
            <PinnedTask
              key={task.id}
              task={task.name}
              id={task.id}
              completed={task.completed}
            />
          )
        }
      })
      setTaskList([...localList])
    }
  }, [])

  return (
    <PinnedTasksContext.Provider
      value={{
        taskList: taskList,
        addTaskFunc: addTaskToList,
        removeTaskFunc: removeTaskFromList,
        updateStatusFunc: updateCompletedStatus,
      }}
    >
      {props.children}
    </PinnedTasksContext.Provider>
  )
}

export default PinnedTasksContext

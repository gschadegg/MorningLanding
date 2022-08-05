import React, { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from '../utils/index'

import NotificationContext from './notification-context'

// default context
const PinnedTasksContext = React.createContext({
  taskList: [],
  addTaskFunc: (newTask) => {},
  removeTaskFunc: (e) => {},
  updateStatusFunc: (id, status) => {},
  updateTaskFunc: (e) => {},
})

export const PinnedTasksContextProvider = (props) => {
  const [taskList, setTaskList] = useState([]) // array of tasks
  const notificationCTX = useContext(NotificationContext)

  //add single task to List
  const addTaskToList = (newTask) => {
    const newID = uuidv4()
    const taskObj = {
      text: newTask,
      completed: false,
      id: newID,
    }

    setTaskList((prevState) => [...prevState, taskObj])

    let localTaskList = getLocalData('ML-pinnedTasks')
    localTaskList = localTaskList ? localTaskList : []
    localTaskList = [...localTaskList, taskObj]
    setLocalData('ML-pinnedTasks', localTaskList)
  }

  //updates task text
  const updateTaskFunc = (id, newText) => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    if (localTaskList) {
      let updateIdx = localTaskList.findIndex((task) => task.id === id)
      if (updateIdx > -1) {
        localTaskList[updateIdx].text = newText
        setLocalData('ML-pinnedTasks', localTaskList)
      } else {
        notificationCTX.setUpNotification(
          `We couldn't find that reminder to update it!`,
          'error'
        )
      }
    } else {
      notificationCTX.setUpNotification(
        `We couldn't find that reminder to update it!`,
        'error'
      )
    }
  }

  //removes task from local data
  const deleteTaskStorage = (id) => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    if (localTaskList) {
      let deleteIdx = localTaskList?.findIndex((task) => task.id === id)
      if (deleteIdx > -1) {
        localTaskList.splice(deleteIdx, 1)
        setLocalData('ML-pinnedTasks', localTaskList)
      } else {
        notificationCTX.setUpNotification(
          `We had trouble deleteing your reminder!`,
          'error'
        )
      }
    }
  }
  //removes single task from list
  const removeTaskFunc = (el) => {
    let idx = taskList?.findIndex((task) => task.id === el.id)
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

  //updates status for task and stores locally
  const updateStatusFunc = (id, status) => {
    let localTaskList = getLocalData('ML-pinnedTasks')
    let setStatus = status ? status : false
    if (localTaskList) {
      let updateIdx = localTaskList.findIndex((task) => task.id === id)

      if (updateIdx > -1) {
        const ttl = setStatus ? setExpiry() : null
        localTaskList[updateIdx].completed = setStatus
        localTaskList[updateIdx].expiry = ttl
        setLocalData('ML-pinnedTasks', localTaskList)
      } else {
        notificationCTX.setUpNotification(
          `We couldn't find that task to update it!`,
          'error'
        )
      }
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
          return task
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
        removeTaskFunc: removeTaskFunc,
        updateStatusFunc: updateStatusFunc,
        updateTaskFunc: updateTaskFunc,
      }}
    >
      {props.children}
    </PinnedTasksContext.Provider>
  )
}

export default PinnedTasksContext

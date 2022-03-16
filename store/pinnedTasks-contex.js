import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import NotificationContext from './notification-context'

import PinnedTask from '../components/Drawer/PinnedTasks/PinnedTask'

// default context
const PinnedTasksContext = React.createContext({
  taskList: [],
  addTaskFunc: (newTask) => {},
  removeTaskFunc: (e) => {},
})

export const PinnedTasksContextProvider = (props) => {
  const [taskList, setTaskList] = useState([])
  const notificationCTX = useContext(NotificationContext)

  const addTaskToList = (newTask) => {
    const newID = uuidv4()
    let newPinned = <PinnedTask key={newID} task={newTask} id={newID} />
    setTaskList((prevState) => [...prevState, newPinned])
  }

  const removeTaskFromList = (e) => {
    e.preventDefault()

    let idx = taskList?.findIndex((task) => task.props.id === e.target.id)
    let newList = taskList
    if (idx > -1 && idx < taskList.length) {
      console.log('taskList', newList)
      newList.splice(idx, 1)
      console.log('newList', newList)

      setTaskList([...newList])
    } else {
      notificationCTX.setUpNotification(
        `We couldn't find that task to remove it!`,
        'error'
      )
    }
  }

  return (
    <PinnedTasksContext.Provider
      value={{
        taskList: taskList,
        addTaskFunc: addTaskToList,
        removeTaskFunc: removeTaskFromList,
      }}
    >
      {props.children}
    </PinnedTasksContext.Provider>
  )
}

export default PinnedTasksContext

import React, { useState, useContext, useEffect, useCallback } from 'react'
import PinnedTasksContext from '../../../store/pinnedTasks-contex'
import styles from './PinnedTasks.module.scss'
import DrawerWidget from '../DrawerWidget/DrawerWidget'

export default function PinnedTaskList() {
  const [newTask, setNewTask] = useState('')
  const pinnedTaskCTX = useContext(PinnedTasksContext)

  const updateTaskHandler = (e) => {
    e.preventDefault()
    setNewTask(e.target.value)
  }

  const onBlurHandler = (e) => {
    if (newTask) {
      pinnedTaskCTX.addTaskFunc(newTask)
      setNewTask('')
    }
  }

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      pinnedTaskCTX.addTaskFunc(newTask)
      setNewTask('')
    }
  }

  return (
    <DrawerWidget title={`Pinned Tasks`} classes={[`column`]}>
      <ul id="pinnedTask_list" className={styles.pinnedTask_list}>
        {pinnedTaskCTX.taskList}
      </ul>
      <ul>
        <li className={styles.newPinnedTask}>
          <button>complete?</button>
          <input
            onChange={updateTaskHandler}
            onKeyDown={onKeyDownHandler}
            value={newTask}
            onBlur={onBlurHandler}
            placeholder="Click to add a pinned task"
          />
        </li>
      </ul>
    </DrawerWidget>
  )
}

import React, { useState, useContext } from 'react'
import PinnedTasksContext from '../../../store/pinnedTasks-contex'
import styles from './PinnedTasks.module.scss'

export default function PinnedTask({ task, id }) {
  const [taskValue, setTaskValue] = useState(task)
  // const [status, setStatus] = useState(false)
  const pinnedTaskCTX = useContext(PinnedTasksContext)

  const updateTaskHandler = (e) => {
    e.preventDefault()
    setTaskValue(e.target.value)
  }

  const onBlurHandler = (e) => {
    e.preventDefault()
    if (e.target.value === '') {
      pinnedTaskCTX.removeTaskFunc(e)
    }
  }

  return (
    <li className={styles.pinnedTask}>
      <button>complete?</button>
      <input
        id={id}
        onBlur={onBlurHandler}
        onChange={updateTaskHandler}
        value={taskValue}
        placeholder="Click to add a pinned task"
      />
    </li>
  )
}

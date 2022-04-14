import React, { useState, useContext, useEffect } from 'react'
import { Icon } from '@iconify/react'
import PinnedTasksContext from '../../../store/pinnedTasks-context'
import CompleteButton from '../../UI/Buttons/CompleteButton/CompleteButton'
import styles from './PinnedTasks.module.scss'

export default function PinnedTask({ task }) {
  const [taskValue, setTaskValue] = useState(task.text)
  const [status, setStatus] = useState(task.completed)
  const pinnedTaskCTX = useContext(PinnedTasksContext)

  const toggleStatus = () => {
    setStatus((prevState) => !prevState)
  }

  const updateTaskHandler = (e) => {
    e.preventDefault()
    setTaskValue(e.target.value)
  }

  const deleteTaskHandler = (e) => {
    const inputEl = e.currentTarget.previousElementSibling
    pinnedTaskCTX.removeTaskFunc(inputEl)
  }

  const onBlurHandler = (e) => {
    e.preventDefault()
    if (e.target.value === '') {
      pinnedTaskCTX.removeTaskFunc(e.target)
    } else {
      pinnedTaskCTX.updateTaskFunc(e.target.id, taskValue)
    }
  }

  useEffect(() => {
    pinnedTaskCTX.updateStatusFunc(task.id, status)
  }, [status, task.id])

  return (
    <li className={`${styles.pinnedTask} ${status ? styles.completed : ''}`}>
      <CompleteButton
        title={status ? 'Un-Mark Completed Task' : 'Mark Task Complete'}
        onClick={toggleStatus}
        iconW={28}
        classes={[status ? 'completed' : '']}
      />
      <input
        title="Edit Reminder"
        id={task.id}
        onBlur={onBlurHandler}
        onChange={updateTaskHandler}
        value={taskValue}
        placeholder="Click to update pinned reminder"
      />
      <button
        onClick={deleteTaskHandler}
        className={styles.pinnedTask_delete}
        title="Delete Reminder"
      >
        <Icon icon="fluent:delete-24-regular" width={20} />
      </button>
    </li>
  )
}

import React, { useState, useContext, useEffect } from 'react'
import { Icon } from '@iconify/react'
import PinnedTasksContext from '../../../store/pinnedTasks-context'
import CompleteButton from '../../UI/Buttons/CompleteButton/CompleteButton'
import styles from './PinnedTasks.module.scss'

export default function PinnedTask({ task, id, completed = false }) {
  const [taskValue, setTaskValue] = useState(task)
  const [status, setStatus] = useState(completed)
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
    }
  }

  useEffect(() => {
    pinnedTaskCTX.updateStatusFunc(id, status)
  }, [status])

  return (
    <li className={`${styles.pinnedTask} ${status ? styles.completed : ''}`}>
      <CompleteButton
        title={status ? 'Un-Mark Completed Task' : 'Mark Task Complete'}
        onClick={toggleStatus}
        iconW={28}
        classes={[status ? 'completed' : '']}
      />
      <input
        title="Edit Task Name"
        id={id}
        onBlur={onBlurHandler}
        onChange={updateTaskHandler}
        value={taskValue}
        placeholder="Click to add a pinned task"
      />
      <button
        onClick={deleteTaskHandler}
        className={styles.pinnedTask_delete}
        title="Delete Task"
      >
        <Icon icon="fluent:delete-24-regular" width={20} />
      </button>
    </li>
  )
}

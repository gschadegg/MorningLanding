import React, { useState, useContext, useMemo } from 'react'
import PinnedTasksContext from '../../../store/pinnedTasks-context'
import styles from './PinnedTasks.module.scss'
import DrawerWidget from '../DrawerWidget/DrawerWidget'
import { Icon } from '@iconify/react'
import PinnedTask from './PinnedTask'

export default function PinnedTaskList() {
  const [newTask, setNewTask] = useState('')
  const pinnedTaskCTX = useContext(PinnedTasksContext)

  const updateTaskHandler = (e) => {
    e.preventDefault()
    setNewTask(e.target.value)
  }

  const onBlurHandler = () => {
    if (newTask) {
      pinnedTaskCTX.addTaskFunc(newTask)
      setNewTask('')
    }
  }

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter' && newTask) {
      pinnedTaskCTX.addTaskFunc(newTask)
      setNewTask('')
    }
  }
  const taskList = useMemo(() => {
    return pinnedTaskCTX.taskList.map((task) => (
      <PinnedTask key={task.id} task={task} />
    ))
  }, [pinnedTaskCTX.taskList])

  return (
    <DrawerWidget
      title={`Pinned Reminders`}
      id={styles.pinnedTasks}
      classes={[`column`]}
      subEl={
        <div className={styles.newPinnedTask}>
          <button onClick={onBlurHandler} title="Add New Reminder">
            <Icon icon="fluent:add-16-filled" width={20} />
          </button>
          <input
            onChange={updateTaskHandler}
            onKeyDown={onKeyDownHandler}
            value={newTask}
            onBlur={onBlurHandler}
            title="New Reminder"
            placeholder="Click to add a pinned reminder"
          />
        </div>
      }
    >
      <ul id="pinnedTask_list" className={styles.pinnedTask_list}>
        {taskList}
      </ul>
    </DrawerWidget>
  )
}

import React from 'react'
import styles from './TaskBox.module.scss'
import { TaskBoxProvider, useTaskBoxContext } from './useTaskBoxContext'
import CompleteButton from '../Buttons/CompleteButton/CompleteButton'

function TaskBox({ children, value: value }) {
  return (
    <TaskBoxProvider value={{ value }}>
      <Wrap>{children}</Wrap>
    </TaskBoxProvider>
  )
}

function Wrap({ children }) {
  const taskCXT = useTaskBoxContext()

  return (
    <div
      className={`${styles.TaskBox} ${
        taskCXT.value.status ? styles.completed : ''
      }`}
    >
      {children}
    </div>
  )
}

function TaskHeader({ children }) {
  return <span>{children}</span>
}
function TaskNumber({ children }) {
  return <em>{children}</em>
}

function Text({ ...args }) {
  return (
    <textarea
      title="Edit Action"
      placeholder="Add an action to focus on for today"
      {...args}
    />
  )
}

TaskBox.Header = TaskHeader
TaskBox.TaskNumber = TaskNumber
TaskBox.CompleteBtn = CompleteButton
TaskBox.Text = Text

export { TaskBox }

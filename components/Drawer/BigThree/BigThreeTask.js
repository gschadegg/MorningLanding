import React, { useState, useEffect } from 'react'
import styles from './BigThree.module.scss'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from './../../../utils/index'
import CompleteButton from '../../UI/Buttons/CompleteButton/CompleteButton'

export default function BigThreeTask({ taskNum }) {
  const [task, setTask] = useState('')
  const [status, setStatus] = useState(false)

  const updateTaskHandler = (e) => {
    e.preventDefault()
    setTask(e.target.value)
  }

  const onBlurHandler = async (e) => {
    //save to localStorage object
    const value = {
      task: task,
      completed: false,
    }
    let bigThreeTasks = getLocalData('ML-bigThreeTasks')

    let ttl = setExpiry()
    value.expiry = ttl

    bigThreeTasks[taskNum] = value
    setLocalData('ML-bigThreeTasks', bigThreeTasks)
    setStatus(false)
  }

  const toggleTaskStatus = () => {
    if (task) {
      setStatus((prevState) => !prevState)
    }
  }

  useEffect(() => {
    let bigThreeTasks = getLocalData('ML-bigThreeTasks')
    if (bigThreeTasks && bigThreeTasks[taskNum]) {
      if (
        bigThreeTasks[taskNum].completed &&
        pastExpiry(bigThreeTasks[taskNum].expiry)
      ) {
        delete bigThreeTasks[taskNum]
        setLocalData('ML-bigThreeTasks', bigThreeTasks)
      } else {
        setTask(bigThreeTasks[taskNum].task)
        setStatus(bigThreeTasks[taskNum].completed)
      }
    }
  }, [])

  //save status locally on change
  useEffect(() => {
    let bigThreeTasks = getLocalData('ML-bigThreeTasks')
    if (bigThreeTasks && bigThreeTasks[taskNum]) {
      bigThreeTasks[taskNum].completed = status
      bigThreeTasks[taskNum].expiry = setExpiry()
      setLocalData('ML-bigThreeTasks', bigThreeTasks)
    }
  }, [status, taskNum])

  return (
    <div className={`${styles.bigThreeTask} ${status ? styles.completed : ''}`}>
      <span>
        <em>0{taskNum}</em>
        <CompleteButton
          title={status ? 'Un-Mark Completed Action' : 'Mark Action Complete'}
          onClick={toggleTaskStatus}
          classes={[status ? 'completed' : '']}
        />
      </span>
      <textarea
        title="Edit Action"
        value={task}
        placeholder="Add an action to focus on for today"
        onChange={updateTaskHandler}
        onBlur={onBlurHandler}
      />
    </div>
  )
}

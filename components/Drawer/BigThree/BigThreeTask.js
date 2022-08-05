import React, { useEffect } from 'react'
import { TaskBox } from '../../UI/TaskBox/TaskBox'
import { useTaskBox } from '../../UI/TaskBox/useTaskBox'

export default function BigThreeTask({ taskNum }) {
  const {
    task,
    status,
    setupData,
    handleUpdateText,
    handleUpdateStatus,
    onBlurHandler,
  } = useTaskBox({
    initialTask: '',
    initialStatus: false,
    localStorageName: 'ML-bigThreeTasks',
    taskNum: taskNum,
  })

  //fetch local data & display
  useEffect(() => {
    setupData(taskNum, 'ML-bigThreeTasks')
  }, [])

  const updateText = (e) => {
    handleUpdateText(e.target.value)
  }

  const toggleStatus = () => {
    handleUpdateStatus(!status)
  }

  return (
    <>
      <TaskBox value={{ task, status }}>
        <TaskBox.Header>
          <TaskBox.TaskNumber>
            {taskNum < 10 ? `0${taskNum}` : taskNum}
          </TaskBox.TaskNumber>
          <TaskBox.CompleteBtn
            title={status ? 'Un-Mark Completed Action' : 'Mark Action Complete'}
            onClick={toggleStatus}
            completed={status && status}
          />
        </TaskBox.Header>
        <TaskBox.Text
          value={task}
          onChange={updateText}
          onBlur={onBlurHandler}
        />
      </TaskBox>
    </>
  )
}

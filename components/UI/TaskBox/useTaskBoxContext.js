import React from 'react'

const TaskBoxContext = React.createContext(undefined)

function TaskBoxProvider({ children, value }) {
  return (
    <TaskBoxContext.Provider value={value}>{children}</TaskBoxContext.Provider>
  )
}

function useTaskBoxContext() {
  const context = React.useContext(TaskBoxContext)
  if (context === undefined) {
    throw new Error('TaskBoxContext must be used within a TaskBoxProvider')
  }
  return context
}

export { TaskBoxProvider, useTaskBoxContext }

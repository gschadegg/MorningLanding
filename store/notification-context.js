import React, { useState } from 'react'

// default context
const NotificationContext = React.createContext({
  notification: null,
  showNotification: false,
  setUpNotification: (message, type) => {},
})

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)
  const [showNotification, setShowNotification] = useState(false)

  const notificationHandler = (message, type) => {
    setNotification({ message: message, type: type })
    setShowNotification(true)
    setTimeout(() => {
      setNotification(null)
      setShowNotification(false)
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{
        notification: notification,
        showNotification: showNotification,
        setUpNotification: notificationHandler,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

// Listening
// could wrap everything
// useContext hook
//where you want to use it
// import from react { useContext}

// const ctxValue = useContext(NotificationContext)
//can then use ctx values

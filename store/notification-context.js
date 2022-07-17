import React, { useState, useCallback } from 'react'

// default context
const NotificationContext = React.createContext({
  notification: null,
  showNotification: false,
  setUpNotification: (message, type) => {},
})

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)
  const [showNotification, setShowNotification] = useState(false)

  const notificationHandler = useCallback((message, type) => {
    setNotification({ message: message, type: type })
    setShowNotification(true)
    setTimeout(() => {
      setNotification(null)
      setShowNotification(false)
    }, 5000)
  }, [])

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

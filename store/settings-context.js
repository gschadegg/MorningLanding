import React, { useState, useContext } from 'react'
import NotificationContext from './notification-context'

// default context
const SettingsContext = React.createContext({
  userLocation: {},
  widgetsSettings: {},
  setUpNotification: (message, type) => {},
})

export const SettingsContextProvider = (props) => {
  const [userLocation, setUserLocation] = useState({})
  const [widgetsSettings, setWidgetsSettings] = useState({})
  const notificationCTX = useContext(NotificationContext)

  const updateUserLocation = (city, state, country = 'USA') => {
    setUserLocation({ city: city, state: state, country: country })
  }
  const updateWidgetSettings = ({ newSettingsObj }) => {
    setWidgetsSettings((prevState = { ...prevState, ...newSettingsObj }))

    notificationCTX.setUpNotification('Saving your settings!', 'success')
  }
  return (
    <SettingsContext.Provider
      value={{
        userLocation: userLocation,
        widgetsSettings: widgetsSettings,
        updateUserLocationHandler: updateUserLocation,
        updateWidgetSettingsHandler: updateWidgetSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext

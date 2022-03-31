import React, { useState, useContext, useEffect } from 'react'
import NotificationContext from './notification-context'

// default context
const SettingsContext = React.createContext({
  userLocation: '',
  widgetsSettings: [],
  activeWidgets: {},
  updateWidgetSettings: (newSettings) => {},
  updateUserLocation: (newLocation, country) => {},
})

export const SettingsContextProvider = (props) => {
  const [userLocation, setUserLocation] = useState()
  const [widgetsSettings, setWidgetsSettings] = useState([])
  const [activeWidgets, setActiveWidgets] = useState({})

  const notificationCTX = useContext(NotificationContext)

  const updateUserLocation = (newLocation) => {
    try {
      setUserLocation(newLocation)
    } catch (error) {
      notificationCTX.setUpNotification(
        'There was an issue saving your new settings',
        'error'
      )
    }
  }

  const updatingActiveWidgets = (newArr) => {
    const widgets = newArr.reduce((all, widget) => {
      return { ...all, [widget]: true }
    }, {})

    setActiveWidgets({ ...widgets })
  }

  const updateWidgetSettings = (newSettings) => {
    try {
      setWidgetsSettings(newSettings)
      updatingActiveWidgets(newSettings)
    } catch (error) {
      notificationCTX.setUpNotification(
        'There was an issue saving your new settings',
        'error'
      )
    }
  }

  //Get local settings
  useEffect(() => {
    let localSettings = localStorage.getItem('ML-settings')
    localSettings = localSettings ? JSON.parse(localSettings) : null
    if (localSettings) {
      setWidgetsSettings([...localSettings.activeWidgets])
      setUserLocation(localSettings.location)

      updatingActiveWidgets(localSettings.activeWidgets)
    } else {
      setWidgetsSettings([
        'Daily Big Three',
        'Pinned Reminders',
        'Inspirational Quotes',
      ])
      updatingActiveWidgets([
        'Daily Big Three',
        'Pinned Reminders',
        'Inspirational Quotes',
      ])
    }
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        userLocation: userLocation,
        widgetsSettings: widgetsSettings,
        activeWidgets: activeWidgets,
        updateUserLocation: updateUserLocation,
        updateWidgetSettings: updateWidgetSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext

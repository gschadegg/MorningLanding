import React, { useState, useContext, useEffect } from 'react'
import NotificationContext from './notification-context'
import { setExpiry, pastExpiry, setLocalData, getLocalData } from '../utils'
import services from '../services'

// default context
const SettingsContext = React.createContext({
  // userLocation: '',
  mainLocationData: {},
  widgetsSettings: [],
  activeWidgets: {},
  updateWidgetSettings: (newSettings) => {},
  // updateUserLocation: (newLocation, country) => {},
})

export const SettingsContextProvider = (props) => {
  // const [userLocation, setUserLocation] = useState()
  const [mainLocationData, setMainLocationData] = useState()
  const [widgetsSettings, setWidgetsSettings] = useState([])
  const [activeWidgets, setActiveWidgets] = useState({})

  const notificationCTX = useContext(NotificationContext)

  const fetchlocation = async (lat, lng, cityState) => {
    let dataResults
    // if (cityState) {
    //   let { results } = await services.getLocationByCity(cityState)
    //   dataResults = results
    // } else {
    let { results } = await services.getLocation(lat, lng)
    dataResults = results
    // }

    if (dataResults) {
      let expiryData = setExpiry()

      setLocalData('ML-location', { data: dataResults[0], expiryData })
      setMainLocationData(dataResults[0])
    } else {
      notificationCTX.setUpNotification(
        "We couldn't find your location, try manually setting your hometown!",
        'error'
      )
    }
  }

  const handleGeoLocationError = (error) => {
    let errorStr
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.'
        break
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.'
        break
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.'
        break
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.'
        break
      default:
        errorStr = 'An unknown error occurred.'
    }
    notificationCTX.setUpNotification(errorStr, 'error')
  }

  const getCords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const expiryData = setExpiry()

          setLocalData('ML-locationCord', {
            latitude: latitude,
            longitude: longitude,
            expiryData,
          })
          fetchlocation(latitude, longitude, null)
        },
        null,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 100000000,
        },
        handleGeoLocationError
      )
    } else {
      notificationCTX.setUpNotification(
        'Geolocation is not supported by this browser.',
        'error'
      )
    }
  }

  // const updateUserLocation = (newLocation) => {
  //   try {
  //     setUserLocation(newLocation)
  //     if (newLocation === '') {
  //       getCords()
  //     } else {
  //       fetchlocation(null, null, newLocation)
  //     }
  //   } catch (error) {
  //     notificationCTX.setUpNotification(
  //       'There was an issue saving your new settings',
  //       'error'
  //     )
  //   }
  // }

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
      throw new Error(error)
    }
  }

  //Get local settings
  useEffect(() => {
    let localSettings = getLocalData('ML-settings')

    if (localSettings) {
      setWidgetsSettings([...localSettings.activeWidgets])
      // setUserLocation(localSettings.location)

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

  useEffect(() => {
    let locationStored = getLocalData('ML-location')

    if (locationStored && !pastExpiry(locationStored?.expiryData)) {
      setMainLocationData(locationStored.data)
    }
    // else if (userLocation) {
    //   fetchlocation(null, null, userLocation)
    // }
    else {
      let locationCordStored = getLocalData('ML-locationCord')

      if (locationCordStored && !pastExpiry(locationCordStored?.expiryData)) {
        fetchlocation(
          locationCordStored.latitude,
          parsedCordsStored.longitude,
          null
        )
      } else {
        getCords()
      }
    }
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        // userLocation: userLocation,
        mainLocationData: mainLocationData,
        widgetsSettings: widgetsSettings,
        activeWidgets: activeWidgets,
        // updateUserLocation: updateUserLocation,
        updateWidgetSettings: updateWidgetSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext

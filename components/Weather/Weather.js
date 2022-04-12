import { useEffect, useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import services from './../../services/index'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
  deleteLocalData,
} from '../../utils'
import styles from './Weather.module.scss'
import weatherCodes from './../../data/weatherCodes.json'

import { Icon } from '@iconify/react'

const Weather = ({ location }) => {
  const [weather, setWeather] = useState()
  const notificationCTX = useContext(NotificationContext)

  useEffect(() => {
    const getWeather = async () => {
      try {
        let data = await services.getWeather(location)
        if (data && data.main) {
          let expiryData = setExpiry('every6Hrs')
          setLocalData('ML-weather', { data, expiryData })
          setWeather(data)
        } else {
          deleteLocalData('ML-weather')
          notificationCTX.setUpNotification(
            "Weather couldn't be set for your location right now!",
            'error'
          )
        }
      } catch (error) {
        notificationCTX.setUpNotification(
          "Weather couldn't be set for your location right now!",
          'error'
        )
      }
    }

    let weatherStored = getLocalData('ML-weather')

    if (weatherStored && !pastExpiry(weatherStored.expiryData)) {
      setWeather(weatherStored.data)
    } else {
      if (location) {
        getWeather()
      }
    }
    return () => {}
  }, [])

  const weatherIcon =
    weather?.weather[0].icon.slice(-1) === 'd'
      ? `${weatherCodes[weather?.weather[0].id]?.day}`
      : `${weatherCodes[weather?.weather[0].id]?.night}`

  return (
    <>
      {weather && (
        <section className={styles.weather}>
          <Icon icon={weatherIcon} width={60} className={styles.weather_icon} />
          <div>
            <span className={styles.weather_temp}>
              {Math.floor(weather?.main?.temp)}
              <span className={styles.weather_degree}>&#176;</span>
            </span>
            <span className={styles.weather_unit}>F</span>
          </div>
        </section>
      )}
    </>
  )
}

export default Weather

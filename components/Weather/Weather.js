import { useEffect, useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import services from './../../services/index'
import { setExpiry } from '../../utils'
import styles from './Weather.module.scss'
import weatherCodes from './../../data/weatherCodes.json'

import { Icon } from '@iconify/react'

const Weather = ({ location }) => {
  const [weather, setWeather] = useState()
  const notificationCTX = useContext(NotificationContext)

  useEffect(() => {
    const getWeather = async () => {
      let data = await services.getWeather(location)
      if (data && data.location) {
        let expiryData = await setExpiry('every6Hrs')
        window.localStorage.setItem(
          'ML-weather',
          JSON.stringify({ data, expiryData })
        )
        setWeather(data)
      } else {
        window.localStorage.removeItem('ML-weather')
        notificationCTX.setUpNotification(
          "Weather couldn't be set for your location right now!",
          'error'
        )
      }
    }

    const weatherStored = window.localStorage.getItem('ML-weather')
    const parsedWeather = JSON.parse(weatherStored)
    if (
      (location && !weatherStored) ||
      new Date().getTime() > parsedWeather?.expiryData
    ) {
      getWeather()
    }
    if (weatherStored) {
      setWeather(parsedWeather.data)
    }
    return () => {}
  }, [location])

  const weatherIcon =
    weather?.current?.is_day === 'yes'
      ? `${weatherCodes[weather?.current?.weather_code]?.day}`
      : `${weatherCodes[weather?.current?.weather_code]?.night}`

  return (
    <>
      {weather && (
        <section className={styles.weather}>
          <Icon icon={weatherIcon} width={64} className={styles.weather_icon} />
          <div>
            <span className={styles.weather_temp}>
              {weather?.current?.temperature}
              <span className={styles.weather_degree}>&#176;</span>
            </span>
            <span className={styles.weather_unit}>
              {weather?.request?.unit.toUpperCase()}
            </span>
          </div>
        </section>
      )}
    </>
  )
}

export default Weather

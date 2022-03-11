import { useContext, useState } from 'react'
import services from './../../services/index'
import { useMounted } from './../../hooks/index'

import styles from './LocationBlock.module.scss'
import Clock from '../Clock/Clock'
import Weather from '../Weather/Weather'
import DateStamp from '../DateStamp/DateStamp'
import NotificationContext from '../../store/notification-context'

const LocationBlock = () => {
  const mounted = useMounted()
  const [location, setLocation] = useState()
  const notificationCTX = useContext(NotificationContext)

  const fetchlocation = async (lat, lng) => {
    let { data } = await services.getLocation(lat, lng)
    if (data) {
      window.localStorage.setItem('ML-location', JSON.stringify(data[0]))
      setLocation(data[0])
    } else {
      notificationCTX.setUpNotification(
        "We couldn't find your location, try manually setting your hometown!",
        'error'
      )
    }
  }

  if (mounted) {
    const locationCordStored = window.localStorage.getItem('ML-locationCord')
    const locationStored = window.localStorage.getItem('ML-location')
    if (!location) {
      if (
        locationStored &&
        (locationStored?.userSet ||
          new Date().getTime() < locationStored?.expiryData)
      ) {
        const parsedLocationStored = JSON.parse(locationStored)
        setLocation(parsedLocationStored)
      } else {
        if (locationCordStored) {
          const parsedCordsStored = JSON.parse(locationCordStored)
          fetchlocation(parsedCordsStored.latitude, parsedCordsStored.longitude)
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords
                window.localStorage.setItem(
                  'ML-locationCord',
                  JSON.stringify({ latitude: latitude, longitude: longitude })
                )
                fetchlocation(latitude, longitude)
              },
              null,
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 100000000,
              },
              handleError
            )
          } else {
            notificationCTX.setUpNotification(
              'Geolocation is not supported by this browser.',
              'error'
            )
          }
        }
      }
    }
  }

  const handleError = (error) => {
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

  return (
    <>
      <section className={styles.locationBlock_topBar}>
        <Weather location={location} />
        <DateStamp />
      </section>
      <article>
        <Clock />
        {location ? (
          <h2 className={styles.locationBlock_city}>
            In{' '}
            <span>
              {location?.locality && <>{location?.locality},</>}{' '}
              {location?.region_code} - {location?.country_code}
            </span>
          </h2>
        ) : (
          ''
        )}
      </article>
    </>
  )
}

export default LocationBlock

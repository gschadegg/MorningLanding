import { useState, useContext, useEffect } from 'react'

import styles from './GeneraLayout.module.scss'
import services from './../../services/index'
import NotificationContext from '../../store/notification-context'
import Notification from './../UI/Notification/Notification'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from './../../utils/index'

const GeneralLayout = ({ children }) => {
  const notificationCTX = useContext(NotificationContext)
  const [imageData, setImageData] = useState()

  useEffect(() => {
    const getBackground = async () => {
      let data = await services.getUnsplashBG()
      if (data) {
        let expiryData = setExpiry()
        setLocalData('ML-unsplashImage', { data, expiryData })
        setImageData(data)
      } else {
        notificationCTX.setUpNotification("Couldn't find an image!", 'error')
      }
    }

    let backgroundStored = getLocalData('ML-unsplashImage')

    if (backgroundStored) {
      if (backgroundStored.data && !pastExpiry(backgroundStored.expiryData)) {
        setImageData(backgroundStored.data)
      } else {
        getBackground()
      }
    } else {
      getBackground()
    }

    return () => {}
  }, [])
  return (
    <>
      <Notification />
      <div
        className={styles.container}
        style={{
          backgroundImage: imageData?.urls.regular
            ? `url(${imageData?.urls.regular})`
            : null,
          backgroundColor: 'darkslategray',
        }}
      >
        <div className={'container mx-auto'}>{children}</div>
      </div>
    </>
  )
}
export default GeneralLayout

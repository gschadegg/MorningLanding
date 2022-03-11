import { useState, useContext, useEffect } from 'react'

import styles from './GeneraLayout.module.scss'
import { useUnsplashBG, useMounted } from '../../hooks'
import services from './../../services/index'
import NotificationContext from '../../store/notification-context'
import Notification from '../Notification/Notification'
import { setExpiry } from './../../utils/index'

const GeneralLayout = ({ children }) => {
  const mounted = useMounted()
  const notificationCTX = useContext(NotificationContext)
  const [getImage, setGetImage] = useState(true)
  const [imageData, setImageData] = useState()
  // const { fetchedImage, isError } = useUnsplashBG(getImage)

  // if (mounted) {
  //   const backgroundStored = window.localStorage.getItem('ML-unsplashImage')
  //   const parsedBackgroundStored = JSON.parse(backgroundStored)
  //   if (
  //     backgroundStored &&
  //     !imageData &&
  //     (parsedBackgroundStored.userSet ||
  //       new Date().getTime() < parsedBackgroundStored.expiryData)
  //   ) {
  //     setGetImage(false)
  //     setImageData(parsedBackgroundStored.fetchedImage)
  //   }
  // }

  // if (fetchedImage && fetchedImage !== undefined && !imageData) {
  //   let expiryData = setExpiry()
  //   window.localStorage.setItem(
  //     'ML-unsplashImage',
  //     JSON.stringify({ fetchedImage, expiryData, userSet: false })
  //   )
  //   setImageData(fetchedImage)
  // }
  // if (isError) {
  //   notificationCTX.setUpNotification(
  //     'Had trouble searching through our image backgrounds!',
  //     'error'
  //   )
  // }
  useEffect(() => {
    const getBackground = async () => {
      let data = await services.getUnsplashBG()
      if (data) {
        let expiryData = await setExpiry()
        window.localStorage.setItem(
          'ML-unsplashImage',
          JSON.stringify({ data, expiryData, userSet: false })
        )
        setImageData(data)
      } else {
        notificationCTX.setUpNotification("Couldn't find an image!", 'error')
      }
    }

    const backgroundStored = window.localStorage.getItem('ML-unsplashImage')
    if (backgroundStored) {
      const parsedBackground = JSON.parse(backgroundStored)
      if (
        parsedBackground.data &&
        (parsedBackground.userSet ||
          new Date().getTime() < parsedBackground.expiryData)
      ) {
        setImageData(parsedBackground.data)
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
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundColor: 'darkslategray',
        }}
      >
        {children}
      </div>
    </>
  )
}
export default GeneralLayout

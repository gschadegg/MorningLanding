import { useEffect, useState, useContext } from 'react'
import NotificationContext from '../../../store/notification-context'
import SettingsContext from '../../../store/settings-context'
import services from '../../../services/index'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from '../../../utils/index'
import styles from './Quote.module.scss'

const Quote = ({}) => {
  const [quote, setQuote] = useState()
  const notificationCTX = useContext(NotificationContext)
  const { activeWidgets } = useContext(SettingsContext)

  useEffect(() => {
    const getQuote = async () => {
      let data = await services.getQuote()
      if (data) {
        let expiryData = setExpiry()
        setLocalData('ML-quote', { data, expiryData })
        setQuote(data)
      } else {
        notificationCTX.setUpNotification("Couldn't find a quote!", 'error')
      }
    }

    let quoteStored = getLocalData('ML-quote')
    if (quoteStored) {
      if (quoteStored.data && !pastExpiry(quoteStored.expiryData)) {
        setQuote(quoteStored.data)
      } else {
        getQuote()
      }
    } else {
      getQuote()
    }
    return () => {}
  }, [])

  return (
    <section className={styles.quote}>
      {activeWidgets['Inspirational Quotes'] && (
        <>
          <blockquote className={styles.quote_block}>
            "{quote?.contents.quotes[0].quote}"
          </blockquote>
          <cite className={styles.quote_author}>
            {quote?.contents.quotes[0].author}
          </cite>
        </>
      )}
    </section>
  )
}

export default Quote

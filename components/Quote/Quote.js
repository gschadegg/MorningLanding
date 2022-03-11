import { useEffect, useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import services from './../../services/index'
import { setExpiry } from './../../utils/index'
import styles from './Quote.module.scss'

const Quote = ({}) => {
  const [quote, setQuote] = useState()
  const notificationCTX = useContext(NotificationContext)

  useEffect(() => {
    const getQuote = async () => {
      let data = await services.getQuote()
      if (data) {
        let expiryData = await setExpiry()
        window.localStorage.setItem(
          'ML-quote',
          JSON.stringify({ data, expiryData })
        )
        setQuote(data)
      } else {
        notificationCTX.setUpNotification("Couldn't find a quote!", 'error')
      }
    }

    const quoteStored = window.localStorage.getItem('ML-quote')
    if (quoteStored) {
      const parsedQuote = JSON.parse(quoteStored)
      if (parsedQuote.data && new Date().getTime() < parsedQuote.expiryData) {
        setQuote(parsedQuote.data)
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
      <blockquote className={styles.quote_block}>
        "{quote?.contents.quotes[0].quote}"
      </blockquote>
      <cite className={styles.quote_author}>
        {quote?.contents.quotes[0].author}
      </cite>
    </section>
  )
}

export default Quote

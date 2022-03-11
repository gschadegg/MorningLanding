import { useRef } from 'react'
import styles from './DateStamp.module.scss'

const DateStamp = () => {
  const dateContainer = useRef()
  const weekdays = useRef([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ])
  let date = new Date()

  // get written out date
  let dateDisplay = `${Intl.DateTimeFormat([], { month: 'long' }).format(
    date
  )} ${date.getDate()}, ${date.getFullYear()}`
  dateContainer.current = dateDisplay

  return (
    <section className={styles.dateStamp}>
      <div className={styles.dateStamp_day}>
        {weekdays.current[date.getDay()]}
      </div>
      <time
        id="fullDate"
        className={styles.dateStamp_date}
        ref={dateContainer}
        dateTime={dateContainer.current}
      >
        {dateContainer.current}
      </time>
    </section>
  )
}

export default DateStamp

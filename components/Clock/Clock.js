import { useRef, useEffect, useState } from 'react'
import { useMounted } from '../../hooks'
import styles from './Clock.module.scss'

const Clock = () => {
  const clockGreetingRef = useRef()
  const [clockTime, setClockTime] = useState({
    time: '0:00',
    seconds: '00',
    ampm: '--',
  })
  let date = new Date()

  // get written out timezone
  const timezone = date
    .toLocaleDateString([], {
      day: '2-digit',
      timeZoneName: 'short',
    })
    .slice(4)

  useEffect(() => {
    const runTime = () => {
      let date = new Date()
      const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
      let hours = date.getHours() % 12
      hours = hours ? hours : 12

      let greeting = 'Morning'
      if (ampm === 'PM') {
        greeting = hours >= 6 && hours !== 12 ? 'Evening' : 'Afternoon'
      }

      clockGreetingRef.current = `Good ${greeting}, It's Currently`
      let timeDisplay = `${hours}:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      }`
      let secondDisplay = `:${
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      }`
      setClockTime({
        time: `${timeDisplay}`,
        seconds: `${secondDisplay}`,
        ampm: `${ampm}`,
      })
    }
    let interval = setInterval(runTime, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <h1 className={styles.clock_wrap}>
      <div id="clock_greeting" className={styles.clock_greeting}>
        {clockGreetingRef.current}
      </div>
      <div id="time" className={styles.clock_time}>
        <time id="clock" dateTime="" className={styles.clock}>
          <span id="clock_hours" className={styles.clock_hours}>
            {clockTime.time}
          </span>
          <span id="clock_seconds" className={styles.clock_seconds}>
            {clockTime.seconds}
          </span>
          <span id="clock_ampm" className={styles.clock_ampm}>
            {clockTime.ampm}
          </span>
        </time>
        <span id="time_timezone" className={styles.clock_zone}>
          {timezone && timezone}
        </span>
      </div>
    </h1>
  )
}

export default Clock

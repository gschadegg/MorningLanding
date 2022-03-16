import { useRef } from 'react'
import { useMounted } from '../../hooks'
import styles from './Clock.module.scss'

const Clock = () => {
    const mounted = useMounted()
    let date = new Date()

   // get written out timezone
   const timezone = date
   .toLocaleDateString([], {
     day: '2-digit',
     timeZoneName: 'short',
   })
   .slice(4)

    //wait for mounted then run updating clock
    if (mounted) {
     
      const runTime = () => {
        let date = new Date()
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
        let hours = date.getHours() % 12
        hours = hours ? hours : 12
        if(ampm === 'PM'){
          let greeting = 'Morning'
          greeting = (hours >= 6) ? ('Evening') : ('Afternoon')
          document.getElementById('clock_greeting')?.textContent = (`Good ${greeting}, It's Currently`)
        }
        let timeDisplay = `${hours}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
        let secondDisplay = `:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
        document.getElementById('clock_hours')?.textContent = timeDisplay
        document.getElementById('clock_seconds')?.textContent = secondDisplay
        document.getElementById('clock_ampm')?.textContent = ampm
        document.getElementById('clock')?.setAttribute('dateTime', timeDisplay)
      }
      setInterval(runTime, 1000)
    }

  return (
    <h1 className={styles.clock_wrap}>
        <div id='clock_greeting' className={styles.clock_greeting}></div>
        <div id="time" className={styles.clock_time}>
          <time id="clock" dateTime="" className={styles.clock}>
              <span id="clock_hours" className={styles.clock_hours}></span>
              <span id="clock_seconds" className={styles.clock_seconds}></span>
              <span id="clock_ampm" className={styles.clock_ampm}></span>
          </time>
          <span id="time_timezone" className={styles.clock_zone}>{timezone && timezone}</span>
        </div>
    </h1>
  )
}

export default Clock

export const setExpiry = (ttlLength = 'onceDay') => {
  const now = new Date()

  //set dismissial to expire to future date, in days
  const ttl = {
    every6Hrs: 6 * 60 * 60 * 1000, // in ms
    onceDay:
      (24 * 60 * 60 -
        now.getHours() * 60 * 60 -
        now.getMinutes() * 60 -
        now.getSeconds()) *
      1000, // in ms
  }
  console.log(ttl, ttlLength)
  now.setTime(now.getTime() + ttl[ttlLength])

  const expiryData = now.getTime()

  return expiryData
  //   console.log('expiryinfo', expiryInfo)
  // localStorage.setItem('dismissedAlert', JSON.stringify(expiryInfo))
  // setAlertOpen(prevState => !prevState)
}

//   quote - once a day (unless off)
//   backgroudn - once a day (unless set)
//   location - once a day (unless set)
//   weather - once every 6 hours

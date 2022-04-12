export const setExpiry = (ttlLength = 'onceDay') => {
  const now = new Date()
  // const offsetTZ = now.getTimezoneOffset() * 60 * 1000
  //set dismissial to expire to future date, in days
  const ttl = {
    every6Hrs: 6 * 60 * 60 * 1000, // in ms
    onceDay:
      (24 * 60 * 60 -
        now.getHours() * 60 * 60 -
        now.getMinutes() * 60 -
        now.getSeconds()) *
      1000, // time to midnight in ms
  }
  now.setTime(now.getTime() + ttl[ttlLength])

  const expiryData = now.getTime()

  return expiryData
}

export const pastExpiry = (expiry) => {
  if (new Date().getTime() < expiry) {
    return false
  } else {
    return true
  }
}

export const getLocalData = (name) => {
  try {
    let localData = window.localStorage.getItem(name)
    localData = localData ? JSON.parse(localData) : null
    return localData
  } catch (error) {
    return false
  }
}
export const setLocalData = (name, values) => {
  try {
    window.localStorage.setItem(name, JSON.stringify(values))
    return true
  } catch (error) {
    return false
  }
}

export const deleteLocalData = (name) => {
  try {
    window.localStorage.removeItem(name)
    return true
  } catch (error) {
    return false
  }
}

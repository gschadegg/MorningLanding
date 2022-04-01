import { useContext } from 'react'
import axios from 'axios'
import NotificationContext from './../store/notification-context'

import React from 'react'

export function errorMessage({ message, status }) {
  const notificationCTX = useContext(NotificationContext)
  notificationCTX.setUpNotification(message, status)
  return null
}

const getUnsplashBG = async () => {
  const unsplashURL = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&auto=compress,enhance,format&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ID}`

  const res = await axios.get(`${unsplashURL}`)
  return res.data
}

const getWeather = async (location, unit = 'imperial') => {
  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=${unit}`
    const res = await axios.get(`${weatherURL}`)
    return res.data
  } catch (error) {
    errorMessage(`We couldn't fetch the data you were looking for!`, 'error')
  }
}

const getLocation = async (lat, lng) => {
  const locationURL = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
  const res = await axios.get(`${locationURL}`)
  return res.data
}

const getQuote = async () => {
  const quoteURL = 'https://quotes.rest/qod?language=en'
  const res = await axios.get(`${quoteURL}`)
  return res.data
}

export default { getUnsplashBG, getWeather, getLocation, getQuote }

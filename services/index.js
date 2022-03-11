import axios from 'axios'

const getUnsplashBG = async () => {
  const unsplashURL = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&auto=compress,enhance,format&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ID}`

  const res = await axios.get(`${unsplashURL}`)
  return res.data
}

const getWeather = async (location, unit = 'f') => {
  const weatherURL = `http://api.weatherstack.com/current?access_key=${
    process.env.NEXT_PUBLIC_WEATHER_API_KEY
  }&query=${
    location?.locality ? location?.locality : location?.region
  }&units=${unit}`

  const res = await axios.get(`${weatherURL}`)
  return res.data
}

const getLocation = async (lat, lng) => {
  const locationURL = `http://api.positionstack.com/v1/reverse?access_key=${process.env.NEXT_PUBLIC_POSITIONSTACK_KEY}&query=${lat},${lng}`
  const res = await axios.get(`${locationURL}`)
  // console.log('inres', res.data)
  return res.data
}

const getQuote = async () => {
  const quoteURL = 'https://quotes.rest/qod?language=en'
  const res = await axios.get(`${quoteURL}`)
  return res.data
}

export default { getUnsplashBG, getWeather, getLocation, getQuote }

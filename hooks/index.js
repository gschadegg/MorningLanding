import { useState, useEffect } from 'react'
import useSWR from 'swr'

// const fetcher = (...args) =>
//   fetch(...args, {
//     mode: 'cors',
//   })
//     .then((res) => res.json())
//     .catch((error) => {
//       console.log(error)
//     })

// export const useUnsplashBG = (shouldFetch) => {
//   const { data, error } = useSWR(
//     shouldFetch
//       ? `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&auto=compress,enhance,format&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ID}`
//       : null,
//     fetcher
//   )
//   return {
//     fetchedImage: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }

// export const useQuotesAPI = (shouldFetch) => {
//   const { data, error } = useSWR(
//     shouldFetch ? 'https://quotes.rest/qod?language=en' : null,
//     fetcher
//   )

//   return {
//     fetchedQuote: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }

// export const useLocationAPI = (shouldFetch, coordinates) => {
//   const { data, error } = useSWR(
//     shouldFetch
//       ? `http://api.positionstack.com/v1/forward
//     ?access_key=${NEXT_PUBLIC_POSITIONSTACK_KEY}
//     &query=${coordinates.lat},${coordinates.lng}`
//       : null,
//     fetcher
//   )

//   return {
//     fetchedLocation: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

import { NotificationContextProvider } from '../store/notification-context'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Component {...pageProps} />
    </NotificationContextProvider>
  )
}
export default MyApp

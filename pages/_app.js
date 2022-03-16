import { NotificationContextProvider } from '../store/notification-context'
import { SettingsContextProvider } from '../store/settings-context'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </SettingsContextProvider>
  )
}
export default MyApp

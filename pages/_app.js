import { NotificationContextProvider } from '../store/notification-context'
import { SettingsContextProvider } from '../store/settings-context'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import '../styles/globals.scss'
import '../styles/form.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <SettingsContextProvider>
        <NotificationContextProvider>
          <Component {...pageProps} />
        </NotificationContextProvider>
      </SettingsContextProvider>
    </ErrorBoundary>
  )
}
export default MyApp

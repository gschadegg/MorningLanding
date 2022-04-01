import { useContext } from 'react'
import { Icon } from '@iconify/react'
import NotificationContext from '../../../store/notification-context'
import styles from './Notification.module.scss'

const Notification = () => {
  const ctx = useContext(NotificationContext)

  const icon =
    ctx?.notification?.type === 'error'
      ? 'bx:error-alt'
      : 'icon-park-outline:success'
  return (
    <section
      className={`${styles.notification} ${styles[ctx?.notification?.type]}`}
    >
      <Icon icon={icon} width={32} />
      {ctx?.notification?.message}
    </section>
  )
}

export default Notification

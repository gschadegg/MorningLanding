import Link from 'next/link'
import DefaultHead from '../components/layout/DefaultHead'
import GeneralLayout from '../components/layout/GeneralLayout'

import styles from './../styles/Settings.module.scss'

export default function Settings() {
  return (
    <GeneralLayout>
      <DefaultHead title="Settings | Morning Landing" />
      <main className={styles.main}>
        Settings page
        <Link href="/">
          <a>Home</a>
        </Link>
        {/* bg image setting */}
        {/* Location setting */}
        {/* turn off Quotes */}
        {/* optional widgets */}
        {/* add spotify to landing? */}
        {/* add your gmail events for today */}
      </main>
    </GeneralLayout>
  )
}

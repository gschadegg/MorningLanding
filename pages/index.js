import { useState, useRef, useEffect, useContext } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
import SettingsContext from '../store/settings-context'
import styles from '../styles/Home.module.scss'
import DefaultHead from '../components/layout/DefaultHead'
import GeneralLayout from '../components/layout/GeneralLayout'
import Quote from '../components/Quote/Quote'

import LocationBlock from '../components/LocationBlock/LocationBlock'
import { Icon } from '@iconify/react'
import Drawer from '../components/Drawer/Drawer'
import Settings from './../components/Settings/Settings'
import OutlinedButton from '../components/UI/Buttons/OutlinedButton'
import QuickLinks from '../components/Widgets/QuickLinks/QuickLinks'

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const settingsCXT = useContext(SettingsContext)

  const toggleActionDrawer = () => {
    setShowDrawer((prevState) => !prevState)
  }
  const toggleSettingsPanel = () => {
    setShowSettings((prevState) => !prevState)
  }
  return (
    <GeneralLayout>
      <DefaultHead title={'Morning Landing'} />
      <main className={styles.main}>
        <section className={styles.main_col}>
          <LocationBlock />
          <Quote />
          <button
            className={styles.btn_settingsIcon}
            onClick={toggleSettingsPanel}
          >
            <Icon
              icon={'clarity:settings-solid'}
              width={36}
              className={styles.settings_icon}
            />
            <span>Settings</span>
          </button>
        </section>
        <section className={styles.main_col}>
          {showDrawer ? (
            ''
          ) : (
            <OutlinedButton
              classes={[`btn-drawerToggle`]}
              onClick={toggleActionDrawer}
            >
              <Icon
                icon={'clarity:circle-arrow-line'}
                width={24}
                rotate={3}
                inline={true}
              />
              View the Day's Actions
            </OutlinedButton>
          )}
          <article>
            {/* right col */}
            {settingsCXT['Quick Links'] && <QuickLinks />}
          </article>
        </section>
        <Drawer
          toggleDrawer={toggleActionDrawer}
          classes={[showDrawer ? 'active' : '']}
        />
        <Settings
          toggleSettingsHandler={toggleSettingsPanel}
          classes={[showSettings ? 'active' : '']}
        />
      </main>
    </GeneralLayout>
  )
}

import { useState, useRef, useEffect, useContext } from 'react'

import SettingsContext from '../store/settings-context'
import styles from '../styles/Home.module.scss'
import DefaultHead from '../components/layout/DefaultHead'
import GeneralLayout from '../components/layout/GeneralLayout'
import Quote from '../components/Widgets/Quote/Quote'

import LocationBlock from '../components/LocationBlock/LocationBlock'
import { Icon } from '@iconify/react'
import Drawer from '../components/Drawer/Drawer'
import Settings from './../components/Settings/Settings'
import OutlinedButton from '../components/UI/Buttons/OutlinedButton'
import QuickLinks from '../components/Widgets/QuickLinks/QuickLinks'
import NewUserMessage from '../components/NewUserMessage/NewUserMessage'

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const settingsCXT = useContext(SettingsContext)

  const toggleActionDrawer = () => {
    setShowSettings(false)
    setShowDrawer((prevState) => !prevState)
  }
  const toggleSettingsPanel = () => {
    setShowDrawer(false)
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
          {/* {showDrawer ? (
            ''
          ) : ( */}
          <OutlinedButton
            classes={[`btn-drawerToggle`, `${showDrawer ? 'invisible' : ''}`]}
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
          {/* )} */}
          <article className="flex justify-end">
            {/* right col */}
            {/* {settingsCXT['Quick Links'] && <QuickLinks />} */}
            {/* <QuickLinks /> */}
            {settingsCXT.newUser ? (
              <NewUserMessage
                toggleNewUser={settingsCXT.setupNewUser}
                toggleSettingsPanel={toggleSettingsPanel}
                toggleActionDrawer={toggleActionDrawer}
              />
            ) : (
              <QuickLinks />
            )}
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

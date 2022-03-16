import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import DefaultHead from '../components/layout/DefaultHead'
import GeneralLayout from '../components/layout/GeneralLayout'
import Quote from '../components/Quote/Quote'

import LocationBlock from '../components/LocationBlock/LocationBlock'
import { Icon } from '@iconify/react'
import Drawer from '../components/Drawer/Drawer'
import Settings from './../components/Settings/Settings'
import OutlinedButton from '../components/UI/Buttons/OutlinedButton'

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const toggleActionDrawer = () => {
    setShowDrawer((prevState) => !prevState)
  }
  const toggleSettingsPanel = () => {
    setShowSettings((prevState) => !prevState)
  }
  return (
    <GeneralLayout>
      <DefaultHead title="Morning Landing" />
      <main className={styles.main}>
        <section className={styles.main_col}>
          <LocationBlock />
          <Quote />
          <button
            className={styles.btn_settingsIcon}
            onClick={toggleSettingsPanel}
          >
            <Icon
              icon="clarity:settings-solid"
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
                icon="clarity:circle-arrow-line"
                width={24}
                rotate={3}
                inline={true}
              />
              View the Day's Actions
            </OutlinedButton>
          )}

          {/* <OutlinedButton
            classes={[
              `${
                showDrawer ? 'active dark btn-drawerToggle' : 'btn-drawerToggle'
              }`,
            ]}
            onClick={toggleActionDrawer}
          >
            {showDrawer ? (
              <Icon
                icon="clarity:circle-arrow-line"
                width={24}
                rotate={1}
                inline={true}
              />
            ) : (
              <Icon
                icon="clarity:circle-arrow-line"
                width={24}
                rotate={3}
                inline={true}
              />
            )}
            {showDrawer ? 'Close Actions' : "View the Day's Actions"}
          </OutlinedButton> */}
        </section>
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}
        <Drawer
          toggleDrawer={toggleActionDrawer}
          classes={[showDrawer ? 'active' : '']}
        />
        <Settings
          toggleSettingsHandler={toggleSettingsPanel}
          classes={[showSettings ? 'active' : '']}
        />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer> */}
    </GeneralLayout>
  )
}

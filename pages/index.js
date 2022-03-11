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
          <button onClick={toggleSettingsPanel}>
            <Icon
              icon="clarity:settings-solid"
              width={36}
              className={styles.settings_icon}
            />
          </button>
        </section>
        <section className={styles.main_col}>
          <button
            className={`btn_outlined ${showDrawer ? 'active' : ''}`}
            onClick={toggleActionDrawer}
          >
            {showDrawer ? 'Close Actions' : "View the Day's Actions"}
          </button>
        </section>
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}
        <Drawer classes={[showDrawer ? 'active' : '']} />
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

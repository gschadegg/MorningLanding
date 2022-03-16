import React from 'react'
import { Icon } from '@iconify/react'

import styles from './Settings.module.scss'

export default function Settings({ toggleSettingsHandler, classes }) {
  return (
    <article className={`${styles.settings_panel} ${classes.join(' ')}`}>
      <section>
        <h2>
          {' '}
          <Icon
            icon="clarity:settings-solid"
            width={36}
            className={styles.settings_icon}
          />{' '}
          Settings
        </h2>
        <button onClick={toggleSettingsHandler}>close</button>
      </section>
      <form>
        <div>
          <label>Your Location</label>
          <input />
        </div>
        <div>
          Pick Your Widgets{' '}
          <div>
            <label className="container">
              Quick Links
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Reminders
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Daily Big Three
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Pinned Tasks
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Inspirational Quotes
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Spotify Player
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Gmail Calendar
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <button>Save Settings</button>
      </form>
    </article>
  )
}

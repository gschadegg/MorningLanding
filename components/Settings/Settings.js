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
    </article>
  )
}

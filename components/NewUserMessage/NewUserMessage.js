import React from 'react'
import styles from './NewUserMessage.module.scss'

export default function NewUserMessage({
  toggleActionDrawer,
  toggleSettingsPanel,
}) {
  return (
    <article className={styles.newUserMessage_container}>
      <h2>Welcome to Your Morning Landing</h2>
      <section>
        <p>A quick dashboard to get your day started with </p>
        <ul>
          <li>Notes from the previous day,</li>
          <li>Setting up your day's big three,</li>
          <li>Or simply a home for your main links to jump right in</li>
        </ul>
        <p>
          Customize the widgets you use to start the day in{' '}
          <button onClick={toggleSettingsPanel}>Settings</button> and view all
          the day's Actions in the{' '}
          <button onClick={toggleActionDrawer}>Action bar</button>.
        </p>
        <button>Sounds Easy Enough!</button>
      </section>
    </article>
  )
}

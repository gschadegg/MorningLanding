import React from 'react'
import styles from './NewUserMessage.module.scss'
import OutlinedButton from '../UI/Buttons/OutlinedButton'

export default function NewUserMessage({
  toggleNewUser,
  toggleActionDrawer,
  toggleSettingsPanel,
}) {
  return (
    <article className={styles.newUserMessage_container}>
      <h2>
        Welcome to Your <br />
        <span>Morning Landing</span>
      </h2>
      <section>
        <p>A quick dashboard to get your day started with </p>
        <ul>
          <li>Notes from the previous day,</li>
          <li>The three tasks that would make the day a success,</li>
          <li>Or simply a home for your primary links to jump right in</li>
        </ul>
        <p>
          Customize the widgets you use to start the day in{' '}
          <button onClick={toggleSettingsPanel}>Settings</button> and view what
          today's focus is in{' '}
          <button onClick={toggleActionDrawer}>Actions</button>.
        </p>
      </section>
      <OutlinedButton onClick={() => toggleNewUser(false)} classes={['dark']}>
        Sounds Easy Enough!
      </OutlinedButton>
    </article>
  )
}

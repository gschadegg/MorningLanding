import React, { useContext } from 'react'
import { PinnedTasksContextProvider } from '../../store/pinnedTasks-context'
import SettingsContext from '../../store/settings-context'
import BigThree from './BigThree/BigThree'
import PinnedTaskList from './PinnedTasks/PinnedTaskList'
import OutlinedButton from '../UI/Buttons/OutlinedButton'
import styles from './Drawer.module.scss'
import { Icon } from '@iconify/react'

export default function Drawer({ classes, toggleDrawer }) {
  const { activeWidgets } = useContext(SettingsContext)

  return (
    <article className={`${styles.action_drawer} ${classes.join(' ')}`}>
      <OutlinedButton
        classes={[`active dark btn-drawerToggle`]}
        onClick={toggleDrawer}
      >
        <Icon
          icon="clarity:circle-arrow-line"
          width={24}
          rotate={1}
          inline={true}
        />
        Close Actions
      </OutlinedButton>
      {activeWidgets['Daily Big Three'] && <BigThree />}
      {activeWidgets['Pinned Reminders'] ? (
        <PinnedTasksContextProvider>
          <PinnedTaskList />
        </PinnedTasksContextProvider>
      ) : (
        'notepad display'
      )}
    </article>
  )
}

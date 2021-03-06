import React, { useContext } from 'react'
import { PinnedTasksContextProvider } from '../../store/pinnedTasks-context'
import SettingsContext from '../../store/settings-context'
import BigThree from './BigThree/BigThreeGroup'
import PinnedTaskList from './PinnedTasks/PinnedTaskList'
import OutlinedButton from '../UI/Buttons/OutlinedButton'
import styles from './Drawer.module.scss'
import { Icon } from '@iconify/react'
import Notepad from './Notepad.js/Notepad'

export default function Drawer({ classes, toggleDrawer }) {
  const { activeWidgets } = useContext(SettingsContext)

  return (
    <article className={`${styles.action_drawer} ${classes.join(' ')}`}>
      <OutlinedButton
        classes={[`active dark btn-drawerToggle reverseIcon`]}
        onClick={toggleDrawer}
      >
        Close Actions
        <Icon
          icon="clarity:circle-arrow-line"
          width={24}
          rotate={1}
          inline={true}
        />
      </OutlinedButton>
      {activeWidgets["Today's Big Three"] && <BigThree />}
      {activeWidgets['Pinned Reminders'] ? (
        <PinnedTasksContextProvider>
          <PinnedTaskList />
        </PinnedTasksContextProvider>
      ) : (
        <Notepad />
      )}
    </article>
  )
}

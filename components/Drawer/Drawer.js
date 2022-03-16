import React from 'react'
import { PinnedTasksContextProvider } from '../../store/pinnedTasks-contex'
import BigThree from './BigThree/BigThree'
import PinnedTaskList from './PinnedTasks/PinnedTaskList'
import OutlinedButton from '../UI/Buttons/OutlinedButton'
import styles from './Drawer.module.scss'
import { Icon } from '@iconify/react'

export default function Drawer({ classes, toggleDrawer }) {
  // figure out which widgets are set to display

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
      <BigThree />
      <PinnedTasksContextProvider>
        <PinnedTaskList />
      </PinnedTasksContextProvider>
    </article>
  )
}

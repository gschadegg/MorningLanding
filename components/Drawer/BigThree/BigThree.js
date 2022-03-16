import React from 'react'
import styles from './BigThree.module.scss'
import DrawerWidget from '../DrawerWidget/DrawerWidget'
import BigThreeTask from './BigThreeTask'

export default function BigThree() {
  return (
    <DrawerWidget title={`Today's Big Three`} classes={[`inline`]}>
      <BigThreeTask taskNum={1} />
      <BigThreeTask taskNum={2} />
      <BigThreeTask taskNum={3} />
    </DrawerWidget>
  )
}

import React from 'react'
import styles from './Drawer.module.scss'

export default function Drawer({ classes }) {
  return (
    <article className={`${styles.action_drawer} ${classes.join(' ')}`}>
      Drawer
    </article>
  )
}

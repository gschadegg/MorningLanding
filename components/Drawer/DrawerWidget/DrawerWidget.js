import React from 'react'
import styles from './DrawerWidget.module.scss'

export default function DrawerWidget({ title, classes, children }) {
  return (
    <article className={`${styles.widget_container}`}>
      <h2>{title}</h2>
      <section className={`${classes.join(' ')}`}>{children}</section>
    </article>
  )
}

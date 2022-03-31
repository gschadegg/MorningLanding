import React from 'react'
import styles from './DrawerWidget.module.scss'

export default function DrawerWidget({ title, id, classes, children, subEl }) {
  return (
    <article id={id} className={`${styles.widget_container}`}>
      <h2>{title}</h2>
      {subEl && subEl}
      <section className={`${classes.join(' ')}`}>{children}</section>
    </article>
  )
}

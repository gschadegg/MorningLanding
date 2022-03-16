import React from 'react'
import styles from './OutlinedButton.module.scss'

export default function OutlinedButton({ classes, children, ...args }) {
  return (
    <button
      className={`${styles.btn_outlined}  ${classes.join(' ')}`}
      {...args}
    >
      {children}
    </button>
  )
}

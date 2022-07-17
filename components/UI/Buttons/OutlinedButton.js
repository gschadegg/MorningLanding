import React from 'react'
import styles from './OutlinedButton.module.scss'

export default function OutlinedButton({
  classes = [],
  size = 'base',
  iconOnly = false,
  children,
  ...args
}) {
  return (
    <button
      className={`${styles.btn_outlined} ${styles[size]} ${
        iconOnly && styles.iconOnly
      }  ${classes.join(' ')}`}
      {...args}
    >
      {children}
    </button>
  )
}

import React from 'react'
import styles from './IconButton.module.scss'
import { Icon } from '@iconify/react'

export default function IconButton({ icon, size, classes = [], ...args }) {
  return (
    <button className={`${styles.btn_icon}  ${classes.join(' ')}`} {...args}>
      <Icon icon={icon} width={size} />
    </button>
  )
}

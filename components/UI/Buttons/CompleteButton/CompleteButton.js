import { Icon } from '@iconify/react'
import React from 'react'
import styles from './CompleteButton.module.scss'

export default function CompleteButton({ classes = [], iconW = 42, ...args }) {
  return (
    <button
      className={`${styles.btn_checkButton} ${classes.join(' ')}`}
      {...args}
    >
      <Icon icon="ant-design:check-circle-outlined" width={iconW} />
    </button>
  )
}

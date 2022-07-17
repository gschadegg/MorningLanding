import React from 'react'
import { Icon } from '@iconify/react'
import * as styles from './CloseButton.module.scss'

export default function CloseButton({ size = 32, ...args }) {
  return (
    <button className={styles.settings__closeBtn} {...args}>
      <Icon icon="carbon:close-outline" width={size} rotate={1} inline={true} />
    </button>
  )
}

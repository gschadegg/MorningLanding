import React from 'react'
import { Field } from 'formik'
import { Icon } from '@iconify/react'

import styles from './Checkbox.module.scss'

export default function Checkbox({ valueName, disabled = false, ...args }) {
  return (
    <label className={styles.form__checkbox}>
      <Field
        disabled={disabled}
        type="checkbox"
        name="activeWidgets"
        value={valueName}
      />
      <span className={styles.form__checkbox_mark}>
        <Icon icon="carbon:close-outline" width={24} rotate={1} inline={true} />
      </span>
      <span>{valueName}</span>
    </label>
  )
}

import React from 'react'

import QuickLinkForm from './../../Widgets/QuickLinks/QuickLinkForm'
import IconButton from '../Buttons/IconButton/IconButton'
import { useQuickLink } from './useQuickLink'

import * as styles from './../../Widgets/QuickLinks/QuickLinks.module.scss'

export default function AddQuickLink() {
  const {
    showEditForm,
    setShowEditForm,
    toggleShowFormHandler,
    closeFormOnChange,
    onQLChangeHandler,
  } = useQuickLink({ ql: 'addBtn' })

  return (
    <div className={styles.quickLinks_addBtn} onBlur={toggleShowFormHandler}>
      <IconButton
        onClick={() => setShowEditForm((prevState) => !prevState)}
        icon={'carbon:add-alt'}
        size={36}
        title="Add Quick Link"
        classes={[`${showEditForm && styles.quickLinks_addBtn_active}`]}
      />
      {showEditForm && (
        <QuickLinkForm
          onSubmit={onQLChangeHandler}
          toggleShowForm={toggleShowFormHandler}
          closeForm={closeFormOnChange}
        />
      )}
    </div>
  )
}

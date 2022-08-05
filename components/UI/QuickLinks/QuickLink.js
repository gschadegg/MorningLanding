import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import OutlinedButton from '../../UI/Buttons/OutlinedButton'
import CloseButton from '../../UI/Buttons/CloseButton/CloseButton'
import QuickLinkForm from './../../Widgets/QuickLinks/QuickLinkForm'
import { QuickLinkProvider } from './useQuickLinkContext'

import * as styles from './../../Widgets/QuickLinks/QuickLinks.module.scss'
import { useQuickLink } from './useQuickLink'

export default function QuickLink({ ql }) {
  const {
    quickLink,
    showEditForm,
    quicklinkHover,
    setQuicklinkHover,
    setShowEditForm,
    toggleShowFormHandler,
    closeFormOnChange,
    onQLChangeHandler,
  } = useQuickLink({ ql })

  return (
    <QuickLinkProvider value={{ quickLink }}>
      <article
        id={quickLink.id}
        className={`quickLink ${styles.quickLink} ${
          quicklinkHover || showEditForm ? 'active' : ''
        }`}
        onMouseOver={() => setQuicklinkHover(true)}
        onMouseLeave={() => setQuicklinkHover(false)}
        onBlur={toggleShowFormHandler}
      >
        {!showEditForm ? (
          <OutlinedButton
            size="sm"
            classes={[
              `${!quicklinkHover ? 'invisible' : ''}`,
              'quickLink_editBtn',
            ]}
            onClick={() => setShowEditForm(true)}
          >
            <Icon icon="ant-design:edit-outlined" inline={true} />
            Edit
          </OutlinedButton>
        ) : (
          <CloseButton
            onClick={() => setShowEditForm(false)}
            title="Close QuickLink Edit"
          />
        )}

        <a
          className={styles.quickLink_button}
          href={`${quickLink.url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className={styles.quickLink_icon}>
            {quickLink.image ? (
              <img src={quickLink.image} />
            ) : (
              <Icon icon="fluent:globe-32-regular" width={64} />
            )}
          </div>

          {ql.label}
        </a>
        {showEditForm && (
          <QuickLinkForm
            onSubmit={onQLChangeHandler}
            toggleShowForm={toggleShowFormHandler}
            content={ql}
            closeForm={closeFormOnChange}
          />
        )}
      </article>
    </QuickLinkProvider>
  )
}

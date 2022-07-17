import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import OutlinedButton from '../../UI/Buttons/OutlinedButton'
import CloseButton from '../../UI/Buttons/CloseButton/CloseButton'
import QuickLinkForm from './QuickLinkForm'

import * as styles from './QuickLinks.module.scss'

export default function QuickLink({ changeLinkHandler, ql }) {
  const [quickLink, setQuickLink] = useState({
    url: ql.url.startsWith('http') ? ql.url : `https://${ql.url}` || null,
    label: ql.label || null,
    image: `https://www.google.com/s2/favicons?sz=64&domain=${ql.url}` || null,
  })
  const [showEditForm, setShowEditForm] = useState(false)
  const [quicklinkHover, setQuicklinkHover] = useState(false)

  const toggleShowFormHandler = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowEditForm((prevState) => !prevState)
      setQuicklinkHover(false)
    }
  }

  const closeFormOnChange = () => {
    setShowEditForm(false)
    setQuicklinkHover(false)
  }

  //If There is no favicon returned from api, set null
  useEffect(() => {
    let img
    const checkFavicon = async () => {
      const img = new Image()
      img.src = `https://www.google.com/s2/favicons?sz=64&domain=${ql.url}`
      await img.decode()
      if (img.width < 64) {
        setQuickLink({
          ...quickLink,
          image: null,
        })
      }
    }
    checkFavicon()
    return () => {
      img = null
    }
  }, [])

  return (
    <article
      id={ql.id}
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
          onSubmit={changeLinkHandler}
          toggleShowForm={toggleShowFormHandler}
          content={ql}
          closeForm={closeFormOnChange}
        />
      )}
      {/* <QuickLinkForm
        onSubmit={changeLinkHandler}
        toggleShowForm={toggleShowFormHandler}
        content={ql}
        closeForm={closeFormOnChange}
      /> */}
    </article>
  )
}

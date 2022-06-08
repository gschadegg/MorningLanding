import React, { useState } from 'react'
import QuickLinkForm from './QuickLinkForm'

export default function QuickLink({ updateLink, idx, url, label }) {
  const [quickLink, setQuickLink] = useState({
    url: url || null,
    label: label || null,
  })
  const [showEditForm, setShowEditForm] = useState(false)
  const [quicklinkHover, setQuicklinkHover] = useState(false)

  const toggleShowFormHandler = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowEditForm((prevState) => !prevState)
    }
  }

  return (
    <article
      className={`${quicklinkHover ? 'active' : ''}`}
      onMouseOver={() => setQuicklinkHover(true)}
      onMouseLeave={() => setQuicklinkHover(false)}
    >
      <button onClick={() => setShowEditForm((prevState) => !prevState)}>
        edit
      </button>
      <a href={url}>
        <img src={`https://www.google.com/s2/favicons?sz=64&domain=${url}`} />
        {label}
      </a>
      {showEditForm && (
        <QuickLinkForm
          onSubmit={updateLink}
          toggleShowForm={toggleShowFormHandler}
          content={quickLink}
        />
      )}
    </article>
  )
}

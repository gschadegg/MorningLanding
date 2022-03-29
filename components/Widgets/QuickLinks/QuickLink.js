import React, { useState } from 'react'

export default function QuickLink() {
  const [quickLink, setQuickLink] = useState({ link: '', label: 'Add a Link' })

  const updateLink = () => {
    //take users input and sets state, store to local
  }
  const showForm = () => {
    // show form with link input & name/label
  }

  return (
    <div>
      <button onClick={showForm}>edit</button>
      <a href={quickLink?.link}>{quickLink?.label}</a>
    </div>
  )
}

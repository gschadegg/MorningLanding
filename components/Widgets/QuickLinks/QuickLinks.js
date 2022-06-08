import React, { useEffect, useState } from 'react'
import IconButton from '../../UI/Buttons/IconButton/IconButton'
import QuickLink from './QuickLink'
import { getLocalData, setLocalData } from '../../../utils'
import QuickLinkForm from './QuickLinkForm'

export default function QuickLinks() {
  const [rawQuickLinks, setRawQuickLinks] = useState([
    { url: 'https://www.google.com', label: 'google' },
    {
      url: 'https://www.goprecise.com',
      label: 'my port',
    },
  ])
  const [showNewForm, setShowNewForm] = useState(false)
  let quickLinks
  //on load check local for quick links
  // if non - add no quicklinks
  // if there are quick links, map individual quick links
  // if more then 5 ql, hide add button

  // on add button press, open add/edit form
  // on close/cancel, remove form
  // on save, save data locally

  //

  const toggleShowFormHandler = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowNewForm((prevState) => !prevState)
    }
  }
  //
  const updateLinkHandler = (idx, value) => {
    let quickLinksData = getLocalData('ML-quickLinks')
    if ((value.url === null || value.url === undefined) && quickLinksData) {
      delete quickLinksData[idx]
    } else {
      quickLinksData[idx] = value
    }
    setLocalData('ML-quickLinks', quickLinksData)
    setRawQuickLinks(quickLinksData)
  }

  const onAddHandler = () => {}

  // if there are quick links stored locally, save to state
  useEffect(() => {
    const quickLinksData = getLocalData('ML-quickLinks')
    if (quickLinksData) {
      setRawQuickLinks(quickLinksData)
    }
  }, [])

  //create list of Quick Link Components
  if (rawQuickLinks) {
    quickLinks = rawQuickLinks.map((ql, idx) => {
      return (
        <QuickLink
          key={idx}
          idx={idx}
          updateLink={updateLinkHandler}
          url={ql.url}
          label={ql.label}
        />
      )
    })
  }

  return (
    <section>
      {quickLinks}

      {/* add button */}
      <span>
        <IconButton
          onClick={() => setShowNewForm((prevState) => !prevState)}
          icon={'carbon:add-alt'}
          size={36}
          title="Add Quick Link"
        />
        {showNewForm && (
          <QuickLinkForm
            onSubmit={onAddHandler}
            toggleShowForm={toggleShowFormHandler}
          />
        )}
      </span>
    </section>
  )
}

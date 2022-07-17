import React, { useEffect, useState, useMemo } from 'react'
import IconButton from '../../UI/Buttons/IconButton/IconButton'
import QuickLink from './QuickLink'
import { getLocalData, setLocalData } from '../../../utils'
import QuickLinkForm from './QuickLinkForm'

import * as styles from './QuickLinks.module.scss'

export default function QuickLinks() {
  const [rawQuickLinks, setRawQuickLinks] = useState([])
  const [showNewForm, setShowNewForm] = useState(false)
  let quickLinks

  //toggle edit form and close if clicked outside
  const toggleShowFormHandler = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowNewForm((prevState) => !prevState)
    }
  }

  const onQLChangeHandler = (ql) => {
    let quickLinksData = getLocalData('ML-quickLinks') || []
    let idx = quickLinksData?.findIndex((link) => link.id === ql.id)

    if (idx >= 0) {
      if (ql.url === '' && idx >= 0) {
        quickLinksData.splice(idx, 1)
      } else {
        quickLinksData[idx] = ql
      }
    } else {
      quickLinksData.push(ql)
    }
    setLocalData('ML-quickLinks', quickLinksData)
    setRawQuickLinks(quickLinksData)
  }

  //create list of Quick Link Components
  // if (rawQuickLinks) {
  quickLinks = useMemo(() => {
    return rawQuickLinks?.map((ql, idx) => {
      return (
        <QuickLink key={ql.url} changeLinkHandler={onQLChangeHandler} ql={ql} />
      )
    })
  }, [rawQuickLinks])
  // }
  // if there are quick links stored locally, save to state
  useEffect(() => {
    const quickLinksData = getLocalData('ML-quickLinks')
    if (quickLinksData) {
      setRawQuickLinks(quickLinksData)
    }
  }, [])
  return (
    <section className={styles.quickLinks_list}>
      {quickLinks}

      {quickLinks.length < 10 ? (
        <div
          className={styles.quickLinks_addBtn}
          onBlur={toggleShowFormHandler}
        >
          <IconButton
            onClick={() => setShowNewForm((prevState) => !prevState)}
            icon={'carbon:add-alt'}
            size={36}
            title="Add Quick Link"
            classes={[`${showNewForm && styles.quickLinks_addBtn_active}`]}
          />
          {showNewForm && (
            <QuickLinkForm
              onSubmit={onQLChangeHandler}
              toggleShowForm={toggleShowFormHandler}
              closeForm={setShowNewForm}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </section>
  )
}

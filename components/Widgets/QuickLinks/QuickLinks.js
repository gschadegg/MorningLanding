import React, { useMemo, useContext } from 'react'

import QuickLink from './../../UI/QuickLinks/QuickLink'
import QuickLinkListContext from './../../../store/quicklinkList-context'
import AddQuickLink from '../../UI/QuickLinks/AddQuickLink'

import * as styles from './QuickLinks.module.scss'

export default function QuickLinks() {
  const { quickLinkList } = useContext(QuickLinkListContext)
  let quickLinks

  //create list of Quick Link Components
  quickLinks = useMemo(() => {
    return quickLinkList?.map((ql, idx) => {
      return <QuickLink key={ql.id} ql={ql} />
    })
  }, [quickLinkList])

  return (
    <section className={styles.quickLinks_list}>
      {quickLinks}

      {quickLinks.length < 10 ? <AddQuickLink /> : ''}
    </section>
  )
}

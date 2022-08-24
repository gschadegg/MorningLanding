import React, { useState, useContext, useEffect } from 'react'
import { setLocalData, getLocalData } from '../utils/index'

import NotificationContext from './notification-context'

// default context
const QuickLinkListContext = React.createContext({
  quickLinkList: [],
  updateQLFunc: (id, qlContent) => {},
})

export const QuickLinkListContextProvider = (props) => {
  const [quickLinkList, setQuickLinkList] = useState([]) // array of QuickLinks
  const notificationCTX = useContext(NotificationContext)

  //updates QL List
  const updateQLFunc = (id, qlContent) => {
    let localQLList = getLocalData('ML-quickLinks')
    if (localQLList) {
      let updateIdx = localQLList.findIndex((ql) => ql.id === id)
      if (updateIdx > -1) {
        if (qlContent.url === '' && updateIdx >= 0) {
          localQLList.splice(updateIdx, 1)
        } else {
          if (!qlContent.url?.startsWith('http')) {
            qlContent.url = `https://${qlContent.url}`
          }
          qlContent.image =
            `https://www.google.com/s2/favicons?sz=64&domain=${qlContent.url}` ||
            null
          localQLList[updateIdx] = qlContent
          notificationCTX.setUpNotification(
            `Your Quick Link has been updated!`,
            'success'
          )
        }
      } else {
        localQLList.push(qlContent)
        notificationCTX.setUpNotification(
          `Your Quick Link has been added!`,
          'success'
        )
      }
      setQuickLinkList(localQLList)
      setLocalData('ML-quickLinks', localQLList)
    } else {
      notificationCTX.setUpNotification(
        `We are having trouble adding and updating Quick Links right now!`,
        'error'
      )
    }
  }

  useEffect(() => {
    const quickLinkList = getLocalData('ML-quickLinks')
    if (quickLinkList) {
      setQuickLinkList([...quickLinkList])
    }
  }, [])

  return (
    <QuickLinkListContext.Provider
      value={{
        quickLinkList: quickLinkList,
        updateQLFunc: updateQLFunc,
      }}
    >
      {props.children}
    </QuickLinkListContext.Provider>
  )
}

export default QuickLinkListContext

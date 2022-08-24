import { useState, useEffect, useContext } from 'react'
import QuickLinkListContext from '../../../store/quicklinkList-context'

function useQuickLink({ ql }) {
  const [quickLink, setQuickLink] = useState({
    url: ql.url?.startsWith('http') ? ql.url : `https://${ql.url}` || null,
    label: ql.label || null,
    image: `https://www.google.com/s2/favicons?sz=64&domain=${ql.url}` || null,
    id: ql.id,
  })
  const [showEditForm, setShowEditForm] = useState(false)
  const [quicklinkHover, setQuicklinkHover] = useState(false)

  const { updateQLFunc } = useContext(QuickLinkListContext)

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

  const onQLChangeHandler = (content) => {
    updateQLFunc(content.id, content)
    setQuickLink({
      ...content,
      image:
        `https://www.google.com/s2/favicons?sz=64&domain=${content.url}` ||
        null,
    })
  }

  //If There is no favicon returned from api, set null
  useEffect(() => {
    let img
    const checkFavicon = async () => {
      img = new Image()
      img.src = `https://www.google.com/s2/favicons?sz=64&domain=${ql.url}`
      await img.decode()
      if (img?.width < 64) {
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
  }, [ql.url])

  return {
    quickLink,
    showEditForm,
    quicklinkHover,
    setQuicklinkHover,
    setShowEditForm,
    toggleShowFormHandler,
    closeFormOnChange,
    onQLChangeHandler,
  }
}

export { useQuickLink }

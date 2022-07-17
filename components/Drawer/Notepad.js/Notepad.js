import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import DOMPurify from 'dompurify'
import { setLocalData, getLocalData } from './../../../utils/index'
import DrawerWidget from '../DrawerWidget/DrawerWidget'
import styles from './Notepad.module.scss'

export default function Notepad() {
  const [inputVisible, setInputVisible] = useState(false)
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const localNotes = getLocalData('ML-notePad')
    let cleanNotes = DOMPurify.sanitize(localNotes)

    if (cleanNotes) {
      setMarkdown(cleanNotes)
    }
  }, [])

  const textareaBlurHandler = () => {
    setInputVisible(false)
    setLocalData('ML-notePad', markdown)
  }

  return (
    <DrawerWidget
      title={`Notepad`}
      id={styles.notepad}
      classes={[`column`, 'flex-1']}
    >
      {inputVisible ? (
        <textarea
          autoFocus
          className={styles.markdown__input}
          value={markdown}
          onBlur={textareaBlurHandler}
          onChange={(e) => {
            setMarkdown(DOMPurify.sanitize(e.target.value))
          }}
        ></textarea>
      ) : (
        <section
          className={styles.markdown__display}
          onClick={() => setInputVisible(true)}
        >
          {markdown ? (
            <Markdown options={{ forceBlock: true }}>{markdown}</Markdown>
          ) : (
            <i className={styles.markdown_placholder}>
              Click to add your thoughts, e.g.
              <br /> * where do you want to pick up from tomorrow?
              <br /> * quick ideas from the last meeting?
            </i>
          )}
        </section>
      )}
    </DrawerWidget>
  )
}

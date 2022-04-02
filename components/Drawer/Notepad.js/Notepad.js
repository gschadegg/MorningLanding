import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import DOMPurify from 'dompurify'
import DrawerWidget from '../DrawerWidget/DrawerWidget'
import styles from './Notepad.module.scss'

export default function Notepad() {
  const [inputVisible, setInputVisible] = useState(false)
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const localNotes = localStorage.getItem('ML-notePad')
    let cleanNotes = DOMPurify.sanitize(localNotes)
    cleanNotes = cleanNotes ? JSON.parse(cleanNotes) : null
    if (cleanNotes) {
      setMarkdown(cleanNotes)
    }
  }, [])

  useEffect(() => {
    if (!inputVisible) {
      localStorage.setItem('ML-notePad', JSON.stringify(markdown))
    }
  }, [inputVisible])

  return (
    <DrawerWidget title={`Notepad`} id={styles.notepad} classes={[`column`]}>
      {inputVisible ? (
        <textarea
          autoFocus
          className={styles.markdown__input}
          value={markdown}
          onBlur={() => setInputVisible(false)}
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
              Click to add your thoughts <br /> e.g. where do you want to pick
              up from tomorrow?
            </i>
          )}
        </section>
      )}
    </DrawerWidget>
  )
}

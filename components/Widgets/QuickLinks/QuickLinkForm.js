import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { v4 as uuidv4 } from 'uuid'

import NotificationContext from './../../../store/notification-context'

import * as styles from './QuickLinks.module.scss'

export default function QuickLinkForm({ onSubmit, content = null, closeForm }) {
  const notificationCTX = useContext(NotificationContext)
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
    )
    return !!urlPattern.test(urlString)
  }
  let submitAction

  return (
    <article className={`lg:arrow-up ${styles.quickLink_form}`} tabIndex="0">
      <Formik
        initialValues={{
          url: content?.url || '',
          title: content?.label || '',
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {}
          // if (isValidUrl(values.url)) {
          //   errors.url = 'Invalid URL!'
          // }

          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            let ql = {
              id: content?.id || uuidv4(),
              url: values.url || '',
              label: values.title || '',
            }
            if (submitAction === 'ql_delete') {
              ql = {
                ...ql,
                url: '',
              }
            }
            let message = 'Your Quick Link has been updated!'
            if (ql.url === '') {
              message = 'Your Quick Link has been successfully removed!'
            } else if (!content?.id) {
              message = 'Your Quick Link has been successfully created!'
            }
            onSubmit(ql)
            setSubmitting(false)
            closeForm()
            notificationCTX.setUpNotification(message, 'success')
          } catch (error) {
            notificationCTX.setUpNotification(
              'Failed to update your Quick Link!',
              'error'
            )
            throw new Error(error)
          }
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form>
            <div className={`form__group form__group_inline`}>
              <div className={`form__group_el`}>
                <label className="form__label" htmlFor="url">
                  URL
                </label>

                <Field
                  autoFocus
                  type="text"
                  name="url"
                  placeholder="ex: www.google.com"
                />
              </div>
              <ErrorMessage
                className={'form_errorMessage'}
                name="url"
                component="div"
              />
            </div>
            <div className={`form__group form__group_inline`}>
              <div className={`form__group_el`}>
                <label className={'form__label'} htmlFor="title">
                  Label
                </label>

                <Field type="text" name="title" placeholder="ex: Google" />
              </div>

              {/* <ErrorMessage
                className={'form_errorMessage'}
                name="title"
                component="div"
              /> */}
            </div>
            <button
              type="button"
              className="form_submitBtn"
              disabled={isSubmitting || values.url === ''}
              onClick={() => {
                submitAction = 'ql_save'
                handleSubmit()
              }}
            >
              Save Quick Link
            </button>
            {content?.id && (
              <button
                type="button"
                className="form_secondaryBtn"
                disabled={isSubmitting}
                onClick={() => {
                  submitAction = 'ql_delete'
                  handleSubmit()
                }}
              >
                Delete Quick Link
              </button>
            )}
          </Form>
        )}
      </Formik>
    </article>
  )
}

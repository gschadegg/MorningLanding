import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function QuickLinkForm({
  onSubmit,
  toggleShowForm,
  content = null,
}) {
  return (
    <article onBlur={toggleShowForm}>
      {/* <form onSubmit={onSubmit}>
        <input autoFocus />
        <button onClick={() => setShowForm(false)}>save</button>
      </form> */}

      <Formik
        initialValues={{
          url: content?.url || '',
          title: content?.label || '',
        }}
        enableReinitialize
        // validate={(values) => {
        //   const errors = {}
        //   if (
        //     values.location &&
        //     !/^([^,]+), ([A-Z]{2})$/i.test(values.location)
        //   ) {
        //     errors.location = 'Invalid location or format!'
        //   }
        //   return errors
        // }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            // setLocalData('ML-settings', values)
            // settingsCXT.updateWidgetSettings(values.activeWidgets)
            // settingsCXT.updateUserLocation(values.location)
            setSubmitting(false)

            notificationCTX.setUpNotification(
              'Your Quick Link has been updated!',
              'success'
            )
          } catch (error) {
            notificationCTX.setUpNotification(
              'Failed to update your Quick Link!',
              'error'
            )
            throw new Error(error)
          }
        }}
      >
        {({ isSubmitting }) => (
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

              <ErrorMessage
                className={'form_errorMessage'}
                name="title"
                component="div"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save Quick Link
            </button>
          </Form>
        )}
      </Formik>
    </article>
  )
}

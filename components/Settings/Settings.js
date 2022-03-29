import React from 'react'
import { Icon } from '@iconify/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Settings.module.scss'

export default function Settings({ toggleSettingsHandler, classes }) {
  return (
    <article className={`${styles.settings_panel} ${classes.join(' ')}`}>
      <section>
        <h2>
          {' '}
          <Icon
            icon="clarity:settings-solid"
            width={36}
            className={styles.settings_icon}
          />{' '}
          Settings
        </h2>
        <button onClick={toggleSettingsHandler}>close</button>
      </section>
      <Formik
        initialValues={{
          location: '',
          activeWidgets: [
            'Daily Big Three',
            'Pinned Reminders',
            'Inspirational Quotes',
          ],
        }}
        validate={(values) => {
          const errors = {}
          if (
            values.location &&
            !/^([^,]+), ([A-Z]{2})$/i.test(values.location)
          ) {
            errors.location = 'Invalid location address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          // set settings context to hold current location & widgets
          // context saves data locally
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="location">Your Location</label>
            <Field type="text" name="location" />
            <ErrorMessage name="location" component="div" />
            <div id="checkbox-group">Pick Your Widgets</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Quick Links"
                />
                <span className="checkmark"></span>
                Quick Links
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Daily Big Three"
                />
                <span className="checkmark"></span>
                Daily Big Three
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Pinned Reminders"
                />
                <span className="checkmark"></span>
                Pinned Reminders
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Inspirational Quotes"
                />
                <span className="checkmark"></span>
                Inspirational Quotes
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Spotify Player"
                />
                <span className="checkmark"></span>
                Spotify Player
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="activeWidgets"
                  value="Gmail Calendar"
                />
                <span className="checkmark"></span>
                Gmail Calendar
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </article>
  )
}

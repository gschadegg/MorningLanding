import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import SettingsContext from '../../store/settings-context'
import NotificationContext from '../../store/notification-context'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Settings.module.scss'

export default function Settings({ toggleSettingsHandler, classes }) {
  const settingsCXT = useContext(SettingsContext)
  const notificationCTX = useContext(NotificationContext)

  return (
    <article className={`${styles.settings_panel} ${classes.join(' ')}`}>
      <section className={`${styles.settings__header}`}>
        <h2>
          <Icon
            icon="clarity:settings-solid"
            width={36}
            className={styles.settings_icon}
          />
          Settings
        </h2>
        <button
          title="Close Settings"
          className={styles.settings__closeBtn}
          onClick={toggleSettingsHandler}
        >
          <Icon
            icon="carbon:close-outline"
            width={32}
            rotate={1}
            inline={true}
          />
        </button>
      </section>

      <Formik
        initialValues={{
          location: settingsCXT.userLocation || '',
          activeWidgets: settingsCXT.widgetsSettings,
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {}
          if (
            values.location &&
            !/^([^,]+), ([A-Z]{2})$/i.test(values.location)
          ) {
            errors.location = 'Invalid location or format!'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            window.localStorage.setItem('ML-settings', JSON.stringify(values))
            settingsCXT.updateWidgetSettings(values.activeWidgets)
            settingsCXT.updateUserLocation(values.location)
            setSubmitting(false)
            toggleSettingsHandler()
            notificationCTX.setUpNotification(
              'Your settings have been updated!',
              'success'
            )
          } catch (error) {
            notificationCTX.setUpNotification(
              'Failed to update your settings!',
              'error'
            )
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div
              className={`${styles.form__group} ${styles.form__group_inline}`}
            >
              <label className={styles.form__label} htmlFor="location">
                Your Location
              </label>
              <Field type="text" name="location" placeholder="ex: Bend, OR" />
              <ErrorMessage name="location" component="div" />
            </div>
            <div className={`${styles.form__group} ${styles.form__group_col}`}>
              <div className={styles.form__label} id="checkbox-group">
                Pick Your Widgets
              </div>
              <div
                className={styles.form__checkboxGroup}
                role="group"
                aria-labelledby="checkbox-group"
              >
                <label className={styles.form__checkbox}>
                  <Field
                    disabled
                    type="checkbox"
                    name="activeWidgets"
                    value="Quick Links"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Quick Links</span>
                </label>
                <label className={styles.form__checkbox}>
                  <Field
                    type="checkbox"
                    name="activeWidgets"
                    value="Daily Big Three"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Daily Big Three</span>
                </label>
                <label className={styles.form__checkbox}>
                  <Field
                    type="checkbox"
                    name="activeWidgets"
                    value="Pinned Reminders"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Pinned Reminders</span>
                </label>
                <label className={styles.form__checkbox}>
                  <Field
                    type="checkbox"
                    name="activeWidgets"
                    value="Inspirational Quotes"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Inspirational Quotes</span>
                </label>
                <label className={styles.form__checkbox}>
                  <Field
                    disabled
                    type="checkbox"
                    name="activeWidgets"
                    value="Spotify Player"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Spotify Player</span>
                </label>
                <label className={styles.form__checkbox}>
                  <Field
                    disabled
                    type="checkbox"
                    name="activeWidgets"
                    value="Gmail Calendar"
                  />
                  <span className={styles.form__checkbox_mark}>
                    <Icon
                      icon="carbon:close-outline"
                      width={24}
                      rotate={1}
                      inline={true}
                    />
                  </span>
                  <span>Gmail Calendar</span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Save Settings
            </button>
          </Form>
        )}
      </Formik>
    </article>
  )
}

import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import SettingsContext from '../../store/settings-context'
import {
  setExpiry,
  pastExpiry,
  setLocalData,
  getLocalData,
} from './../../utils/index'
import NotificationContext from '../../store/notification-context'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Settings.module.scss'
import Checkbox from '../UI/Checkbox/Checkbox'

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
          // location: settingsCXT.userLocation || '',
          activeWidgets: settingsCXT.widgetsSettings,
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
            setLocalData('ML-settings', values)
            settingsCXT.updateWidgetSettings(values.activeWidgets)
            // settingsCXT.updateUserLocation(values.location)
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
            throw new Error(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* <div
              className={`${styles.form__group} ${styles.form__group_inline}`}
            >
              <div className={`${styles.form__group_el}`}>
                <label className={styles.form__label} htmlFor="location">
                  Your Location
                </label>

                <Field type="text" name="location" placeholder="ex: Bend, OR" />
              </div>

              <ErrorMessage
                className={styles.form_errorMessage}
                name="location"
                component="div"
              />
            </div> */}
            <div className={`${styles.form__group} ${styles.form__group_col}`}>
              <div className={styles.form__label} id="checkbox-group">
                Pick Your Widgets
              </div>
              <div
                className={styles.form__checkboxGroup}
                role="group"
                aria-labelledby="checkbox-group"
              >
                <Checkbox valueName="Quick Links" disabled={true} />
                <Checkbox valueName="Daily Big Three" />
                <Checkbox valueName="Pinned Reminders" />
                <Checkbox valueName="Inspirational Quotes" />
                <Checkbox valueName="Spotify Player" disabled={true} />
                <Checkbox valueName="Gmail Calendar" disabled={true} />
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

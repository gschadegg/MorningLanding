import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import SettingsContext from '../../store/settings-context'
import { setLocalData } from './../../utils/index'
import NotificationContext from '../../store/notification-context'
import { Formik, Form } from 'formik'
import styles from './Settings.module.scss'
import Checkbox from '../UI/Checkbox/Checkbox'
import CloseButton from '../UI/Buttons/CloseButton/CloseButton'

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
        <CloseButton onClick={toggleSettingsHandler} title="Close Settings" />
      </section>
      <Formik
        initialValues={{
          activeWidgets: !settingsCXT.widgetsSettings.includes(
            'Pinned Reminders'
          )
            ? [...settingsCXT.widgetsSettings, 'NotePad']
            : settingsCXT.widgetsSettings,
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {}
          let options = ['Pinned Reminders', 'NotePad']
          if (values) {
            if (options.every((i) => values.activeWidgets.includes(i))) {
              let idx1 = values.activeWidgets.indexOf(options[0])
              let idx2 = values.activeWidgets.indexOf(options[1])
              values.activeWidgets.splice(Math.min(idx1, idx2), 1)
            }
          }
          return errors
        }}
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
            <div className={`form__group styles.form__group_col`}>
              <div className={'form__label'} id="checkbox-group">
                Pick Your Widgets
              </div>
              <div
                className={'form__checkboxGroup'}
                role="group"
                aria-labelledby="checkbox-group"
              >
                <Checkbox valueName="Quick Links" />
                <Checkbox valueName="Inspirational Quotes" />
                <Checkbox valueName="Today's Big Three" />
                <Checkbox valueName="Pinned Reminders" />
                <Checkbox valueName="NotePad" />
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

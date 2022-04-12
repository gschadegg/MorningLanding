import { useContext } from 'react'

import styles from './LocationBlock.module.scss'
import Clock from '../Clock/Clock'
import Weather from '../Weather/Weather'
import DateStamp from '../DateStamp/DateStamp'
import SettingsContext from '../../store/settings-context'

const LocationBlock = () => {
  const settingsCXT = useContext(SettingsContext)

  return (
    <>
      <section className={styles.locationBlock_topBar}>
        <Weather location={settingsCXT.mainLocationData} />
        <DateStamp />
      </section>
      <article>
        <Clock />
        {settingsCXT.mainLocationData ? (
          <h2 className={styles.locationBlock_city}>
            In{' '}
            <span>
              {settingsCXT.mainLocationData?.city && (
                <>{settingsCXT.mainLocationData?.city},</>
              )}{' '}
              {settingsCXT.mainLocationData?.state_code} -{' '}
              {settingsCXT.mainLocationData?.country_code &&
                String(
                  settingsCXT.mainLocationData?.country_code
                ).toUpperCase()}
            </span>
          </h2>
        ) : (
          ''
        )}
      </article>
    </>
  )
}

export default LocationBlock

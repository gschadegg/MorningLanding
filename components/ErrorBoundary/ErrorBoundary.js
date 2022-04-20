import React from 'react'
import OutlinedButton from '../UI/Buttons/OutlinedButton'
import styles from './../layout/GeneraLayout.module.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    throw new Error({ error, errorInfo })
  }
  render() {
    if (this.state.hasError) {
      return (
        <article
          className={styles.container}
          style={{
            backgroundImage: `url('')`,
            backgroundColor: 'darkslategray',
          }}
        >
          <div
            className={
              'container mx-auto min-h-[100vh] flex flex-col items-center justify-center'
            }
          >
            <h2
              className={
                'text-4xl font-bold capitalize mb-12 text-white leading-6 tracking-wider font-display'
              }
              styles={{ fontVariant: 'small-caps' }}
            >
              Oops, there is an error!
            </h2>
            <OutlinedButton onClick={() => this.setState({ hasError: false })}>
              Try Loading Again?
            </OutlinedButton>
          </div>
        </article>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

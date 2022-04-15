import React from 'react'
import { render } from '@testing-library/react'
import NotificationContext from '../../store/notification-context'
import Notification from './../../components/UI/Notification/Notification'

describe('Notifications', () => {
  beforeEach(() => {})

  it('Render Notification Success', () => {
    const container = render(
      <NotificationContext.Provider
        value={{
          notification: { message: 'My Notification Message', type: 'success' },
          showNotification: jest.fn(),
          setUpNotification: jest.fn(),
        }}
      >
        <Notification />
      </NotificationContext.Provider>
    )
    const message = container.getByText('My Notification Message')
    expect(message.classList.contains('success')).toBe(true)
  })

  it('Render Notification Error', () => {
    const container = render(
      <NotificationContext.Provider
        value={{
          notification: { message: 'My Notification Message', type: 'error' },
          showNotification: jest.fn(),
          setUpNotification: jest.fn(),
        }}
      >
        <Notification />
      </NotificationContext.Provider>
    )
    const message = container.getByText('My Notification Message')
    expect(message.classList.contains('error')).toBe(true)
  })
})

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CompleteButton from './../../components/UI/Buttons/CompleteButton/CompleteButton'
import OutlinedButton from './../../components/UI/Buttons/OutlinedButton'

describe('Complete Button', () => {
  it('Renders Clickable Complete Button', () => {
    const mockOnClick = jest.fn()

    const container = render(
      <CompleteButton title={'Complete Button'} onClick={mockOnClick} />
    )
    const button = container.getByTitle('Complete Button')

    expect(button).toBeDefined()
    expect(button.classList.contains('completed')).toBe(false)

    fireEvent.click(button)
    expect(mockOnClick.mock.calls.length).toEqual(1)
  })

  it('Renders Complete Button with completed class', () => {
    const container = render(
      <CompleteButton title={'Complete Button'} classes={['completed']} />
    )

    const button = container.getByTitle('Complete Button')
    expect(button.classList.contains('completed')).toBe(true)
  })
})

describe('Outlined Button', () => {
  it('Renders Clickable Outlined Button', () => {
    const mockOnClick = jest.fn()

    const container = render(
      <OutlinedButton title={'Outlined Button'} onClick={mockOnClick}>
        Button Text
      </OutlinedButton>
    )
    const button = container.getByTitle('Outlined Button')

    expect(button).toHaveTextContent('Button Text')

    fireEvent.click(button)
    expect(mockOnClick.mock.calls.length).toEqual(1)
  })

  it('Renders Outlined Button with multiple class', () => {
    const container = render(
      <OutlinedButton title={'Outlined Button'} classes={['dark', 'active']} />
    )
    const button = container.getByTitle('Outlined Button')

    expect(button.classList.contains('dark')).toBe(true)
    expect(button.classList.contains('active')).toBe(true)
  })
})

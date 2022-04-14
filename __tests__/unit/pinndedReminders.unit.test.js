import React from 'react'
import { render, fireEvent, within, cleanup } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { PinnedTasksContextProvider } from '../../store/pinnedTasks-context'
import PinnedTaskList from './../../components/Drawer/PinnedTasks/PinnedTaskList'
import PinnedTask from './../../components/Drawer/PinnedTasks/PinnedTask'

describe('Adding New Reminders', () => {
  let container
  beforeEach(() => {
    container = render(
      <PinnedTasksContextProvider>
        <PinnedTaskList />
      </PinnedTasksContextProvider>
    )
  })

  afterEach(() => {
    if (container.queryByTitle('Delete Reminder')) {
      let deleteButton = container.getByTitle('Delete Reminder')
      fireEvent.click(deleteButton)
    }
  })

  it('Add New Reminder with Button', () => {
    const input = container.getByPlaceholderText(
      'Click to add a pinned reminder'
    )
    fireEvent.change(input, {
      target: { value: 'Adding reminder with button' },
    })
    expect(input.value).toBe('Adding reminder with button')

    const addButton = container.getByTitle('Add New Reminder')
    fireEvent.click(addButton)

    const taskList = container.getByRole('list')
    expect(taskList).toBeDefined()

    expect(within(taskList).queryAllByRole('listitem')).toHaveLength(1)
    expect(input.value).toBe('')
  })

  it('Add New Reminder with Enter Keydown', () => {
    const input = container.getByPlaceholderText(
      'Click to add a pinned reminder'
    )
    fireEvent.change(input, {
      target: { value: 'Adding Reminder with Enter' },
    })
    expect(input.value).toBe('Adding Reminder with Enter')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    const taskList = container.getByRole('list')
    expect(taskList).toBeDefined()

    expect(container.queryByText('Adding Reminder with Enter')).toBeDefined()
    expect(input.value).toBe('')
  })

  it('Remove Empty Reminder on Blur', () => {
    const input = container.getAllByPlaceholderText(
      'Click to add a pinned reminder'
    )[0]
    fireEvent.change(input, { target: { value: 'remove on blur' } })
    const addButton = container.getByTitle('Add New Reminder')
    fireEvent.click(addButton)
    expect(container).toBeDefined()

    let newListItem = container.getAllByTitle('Edit Reminder')
    newListItem = newListItem[newListItem.length - 1]
    fireEvent.focus(newListItem)
    fireEvent.change(newListItem, { target: { value: '' } })

    fireEvent.focusOut(newListItem)

    expect(container.queryByRole('listItem')).not.toBeInTheDocument()
  })
})

describe('Pinned Reminder Actions', () => {
  const singleReminder = {
    text: 'this is a pinned reminder',
    completed: false,
    id: uuidv4(),
  }

  let container

  beforeEach(() => {
    container = render(
      <PinnedTasksContextProvider>
        <PinnedTaskList />
      </PinnedTasksContextProvider>
    )

    const input = container.getByPlaceholderText(
      'Click to add a pinned reminder'
    )

    fireEvent.change(input, {
      target: { value: 'this is a pinned reminder' },
    })

    const addButton = container.getByTitle('Add New Reminder')
    fireEvent.click(addButton)
  })

  afterEach(() => {
    if (container.queryByTitle('Delete Reminder')) {
      let deleteButton = container.getByTitle('Delete Reminder')
      fireEvent.click(deleteButton)
    }
  })

  it('Render Reminder', () => {
    expect(container).toBeDefined()
    expect(container.getByTitle('Edit Reminder').value).toBe(
      'this is a pinned reminder'
    )
  })

  it('Toggle Reminder Mark Completed', () => {
    const statusButton = container.getByTitle('Mark Task Complete')
    expect(statusButton).toBeDefined()

    fireEvent.click(statusButton)
    expect(statusButton.title).toBe('Un-Mark Completed Task')
    expect(statusButton.classList.contains('completed')).toBe(true)

    fireEvent.click(statusButton)
    expect(statusButton.title).toBe('Mark Task Complete')
    expect(statusButton.classList.contains('completed')).toBe(false)
  })

  it('Edit Reminder', () => {
    const editedListItem = container.getAllByTitle('Edit Reminder')[0]
    expect(editedListItem).toBeDefined()

    fireEvent.focus(editedListItem)
    fireEvent.change(editedListItem, {
      target: { value: 'Text has been updated' },
    })

    fireEvent.focusOut(editedListItem)

    expect(editedListItem.value).toBe('Text has been updated')
  })

  it('Delete Reminder', () => {
    let deleteButton = container.getByTitle('Delete Reminder')

    fireEvent.click(deleteButton)

    expect(container.queryByRole('listItem')).not.toBeInTheDocument()
  })
})

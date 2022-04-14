import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { PinnedTasksContextProvider } from '../../store/pinnedTasks-context'
import PinnedTaskList from './../../components/Drawer/PinnedTasks/PinnedTaskList'
import PinnedTask from './../../components/Drawer/PinnedTasks/PinnedTask'

afterEach(() => {
  jest.clearAllMocks()
})

it('Add New Reminder', () => {
  let container = render(
    <PinnedTasksContextProvider>
      <PinnedTaskList />
    </PinnedTasksContextProvider>
  )
  const input = container.getByPlaceholderText('Click to add a pinned reminder')
  fireEvent.change(input, { target: { value: 'testing adding reminder' } })
  expect(input.value).toBe('testing adding reminder')

  const addButton = container.getByTitle('Add New Reminder')
  fireEvent.click(addButton)

  const taskList = container.getByRole('list')
  expect(taskList).toBeDefined()

  expect(within(taskList).queryAllByRole('listitem')).toHaveLength(1)
  expect(input.value).toBe('')
})

it('Remove Empty Reminder on Blur', async () => {
  let container = render(
    <PinnedTasksContextProvider>
      <PinnedTaskList />
    </PinnedTasksContextProvider>
  )

  const input = container.getAllByPlaceholderText(
    'Click to add a pinned reminder'
  )[0]
  fireEvent.change(input, { target: { value: 'remove on blur' } })

  const addButton = container.getByTitle('Add New Reminder')
  fireEvent.click(addButton)
  expect(container).toBeDefined()

  const newListItem = container.getAllByTitle('Edit Reminder')[0]
  fireEvent.focus(newListItem)
  fireEvent.change(newListItem, { target: { value: '' } })

  fireEvent.focusOut(newListItem)

  expect(container.queryByRole('listItem')).not.toBeInTheDocument()
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
        <PinnedTask task={singleReminder} />
      </PinnedTasksContextProvider>
    )
  })

  it('Render Reminder', () => {
    expect(container).toBeDefined()
    expect(container.getByTitle('Edit Reminder').value).toBe(
      'this is a pinned reminder'
    )
  })

  it('Toggle Reminder Mark Completed', () => {
    const statusButton = container.getAllByTitle('Mark Task Complete')[0]
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
    let deleteButton = container.getAllByTitle('Delete Reminder')[0]

    fireEvent.click(deleteButton)

    expect(container.queryByRole('listItem')).not.toBeInTheDocument()
  })
})

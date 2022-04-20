describe('Settings', () => {
  before(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.openweathermap.org*',
      },
      (req) => {
        req.destroy()
      }
    )
    cy.intercept(
      {
        method: 'GET',
        url: 'https://quotes.rest/qod*',
      },
      (req) => {
        req.destroy()
      }
    )
    cy.visit('http://localhost:3000')
  })
  it('Setting for Big Three & Pinned Reminders to show', () => {
    cy.contains('Settings').click()
    cy.get('[type="checkbox"]').check(['Daily Big Three', 'Pinned Reminders'], {
      force: true,
    })
    cy.contains('Save Settings').click()

    cy.contains("View the Day's Actions").click()
    cy.contains("Today's Big Three")
    cy.contains('Pinned Reminders')
  })

  it('Show Notepad when Pinned Reminders is set to not show', () => {
    cy.contains('Settings').click()
    cy.get('[type="checkbox"]').uncheck('Pinned Reminders', { force: true })
    cy.contains('Save Settings').click()

    cy.contains("View the Day's Actions").click()
    cy.contains('Notepad')
  })
})

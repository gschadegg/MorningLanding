describe('Morning Landing App', function () {
  before(() => {
    cy.visit('http://localhost:3000')

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
  })
  it('front page can be opened', function () {
    cy.title('Morning Landing')
    cy.contains("View the Day's Actions")
  })

  it('action drawer can be opened & closed', function () {
    cy.contains("View the Day's Actions").click()
    cy.contains('Close Actions').click()
  })

  it('settings can be opened & closed', function () {
    cy.contains('Settings').click()
    cy.get('button[title="Close Settings"]').click()
  })
})

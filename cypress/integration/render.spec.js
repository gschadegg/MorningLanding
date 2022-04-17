describe('Morning Landing App', function () {
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
  it('front page can be opened & Clock Rendered', function () {
    cy.title('Morning Landing')
    cy.contains("View the Day's Actions")
    cy.get('#clock').contains(/AM|PM/g)
  })

  it('action drawer can be opened & closed', function () {
    cy.contains("View the Day's Actions").click()
    cy.contains('Close Actions').click()
  })

  it('settings can be opened & closed', function () {
    cy.contains('Settings').click()
    cy.wait(500)
    cy.get('button[title="Close Settings"]').click()
  })
})

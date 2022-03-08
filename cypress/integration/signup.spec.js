describe('SignUp', () => {
  it('redirect to / after success', () => {

    cy.intercept('POST', `${Cypress.env('api_address')}/register`, { fixture: 'register.json' })
    cy.intercept('POST', `${Cypress.env('api_address')}/login`, { fixture: 'login.json' })
    cy.intercept('GET', `${Cypress.env('api_address')}/users/me`, { fixture: 'me.json' })

    cy.visit('/auth/signup')
    cy.get('input[name="firstName"]').type('Alisson')
    cy.get('input[name="lastName"]').type('Patricio')
    cy.get('input[name="email"]').type('ap@tsl.io')
    cy.get('input[name="phoneNumber"]').type('5615692366')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="acceptConsent"]').click()
    cy.get('button[type="submit"]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/')
    })
  })
})
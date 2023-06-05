import { faker } from '@faker-js/faker'

describe('Forgot Password', () => {
  beforeEach(function () {
    cy.intercept('POST', `/v1/forgot-password`, {
      body: {},
    })
  })

  it('redirect to /forgot-password-reset after success', function () {
    cy.visit('/auth/forgot-password')
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/forgot-password-reset')
    })
  })

})

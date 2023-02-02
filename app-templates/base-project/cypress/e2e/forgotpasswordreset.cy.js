import { faker } from '@faker-js/faker'

describe('Forgot Password Reset', () => {
  beforeEach(function () {
    cy.intercept('POST', `/v1/forgot-password/reset`, {
      body: {},
    })
  })

  it('redirect to / after success', function () {
    cy.visit('/auth/forgot-password-reset')
    cy.get('input[name="newPassword"]').type(faker.internet.password())
    cy.get('input[name="token"]').type(faker.internet.password())
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })

})

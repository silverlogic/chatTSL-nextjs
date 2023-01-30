import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(function () {
    cy.generateFixture()
    cy.fixture('user.json').as('userData').then((user) => {
      this.user = user
    })

    cy.intercept('POST', `${Cypress.env('api_address')}/login`, {
      fixture: 'login',
    })
    cy.intercept('GET', `${Cypress.env('api_address')}/users/me`, {
      fixture: 'user',
    })
  })

  it('redirect to / after success', function () {
    cy.visit('/auth/login')
    cy.get('input[name="email"]').type(this.user.email)
    cy.get('input[name="password"]').type(faker.internet.password())
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})

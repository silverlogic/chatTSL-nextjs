import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(function () {
    cy.generateFixture()
    cy.fixture('user.json').as('userData').then((user) => {
      this.user = user
    })

    cy.intercept('GET', `/v1/auth/mfa/config`, {
      body: {},
    })

    cy.intercept('POST', `/v1/login`, {
      fixture: 'login',
    })
    cy.intercept('GET', `/v1/users/me`, {
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

  it('succeeds with two factor auth', function () {
    cy.intercept('POST', `/v1/login`, {
      body: {method: 'app'},
    })
    cy.intercept('POST', `/v1/login/code`, {
      body: {method: 'app'},
    })
    cy.visit('/auth/login')
    cy.get('input[name="email"]').type(this.user.email)
    cy.get('input[name="password"]').type(faker.internet.password())
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/login')
    })
    cy.get('input[name="code"]').type(faker.internet.password())
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})

import { faker } from '@faker-js/faker'

describe('SignUp', () => {
  beforeEach(function () {
    cy.generateFixture()
    cy.fixture('user.json').as('userData').then((user) => {
      this.user = user
    })

    cy.intercept('POST', `/v1/register`,  {
      fixture: 'user',
    })
    cy.intercept('POST', `/v1/login`, {
      fixture: 'login',
    })
    cy.intercept('GET', `/v1/users/me`, {
      fixture: 'user',
    })
  })
  it('redirect to / after success', function () {

    cy.visit('/auth/signup')
    cy.get('input[name="firstName"]').type(this.user.firstName)
    cy.get('input[name="lastName"]').type(this.user.lastName)
    cy.get('input[name="email"]').type(this.user.email)
    cy.get('input[name="phoneNumber"]').type(faker.phone.number('##########'))
    cy.get('input[name="password"]').type(faker.internet.password())
    cy.get('input[name="acceptConsent"]').click()
    cy.get('button[type="submit"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})

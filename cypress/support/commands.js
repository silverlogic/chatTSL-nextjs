import {faker} from '@faker-js/faker'

Cypress.Commands.add('generateFixture', () => {
  cy.writeFile('cypress/fixtures/user.json', {
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  })
})

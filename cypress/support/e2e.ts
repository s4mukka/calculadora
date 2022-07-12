/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId(id: string): Chainable<JQuery<Element>>;
  }
}

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))

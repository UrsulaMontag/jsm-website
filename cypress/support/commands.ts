/// <reference types="cypress" />

type CustomCommands = {
    waitForMap(): Cypress.Chainable<void>
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface Chainable extends CustomCommands {
        }
    }
}

Cypress.Commands.add('waitForMap', () => {
    cy.get('.leaflet-container', {timeout: 10000}).should('exist')
    cy.get('.leaflet-tile-loaded').should('exist')
})

export {}
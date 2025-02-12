describe('Custom 404 Page', () => {
    it('should display the correct content on the 404 page', () => {
        cy.visit('/de/non-existent-page', {failOnStatusCode: false});

        cy.contains('Seite nicht gefunden').should('be.visible');

        cy.contains('Die von Ihnen gesuchte Seite existiert nicht oder ist noch in der Entwicklung.').should('be.visible');

        cy.contains('Diese Seite ist bald verfügbar.').should('be.visible');

        cy.contains('Zurück zur Startseite')
            .should('have.attr', 'href', '/de')
            .click();

        cy.url().should('eq', Cypress.config().baseUrl + '/de');
    });
});

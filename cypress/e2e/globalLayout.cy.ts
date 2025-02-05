describe('Global Layout', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
    });

    it('should render the layout with the correct locale and theme', () => {
        cy.get('html').should('have.attr', 'lang', 'de');

        cy.get('body').should('have.class', 'antialiased')
            .and('have.class', 'bg-light-bg')

        cy.get('[data-testid="theme-wrapper"]')
            .should('exist')
            .within(() => {
                cy.get('[data-testid="intl-provider"]')
                    .should('exist');
            });
    });
});
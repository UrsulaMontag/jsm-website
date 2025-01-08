describe('Global Layout', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render the layout with the correct locale and theme', () => {
        cy.get('html').should('have.attr', 'lang', 'de');

        cy.get('body').should('have.class', 'antialiased')
            .and('have.class', 'bg-light-bg')
            .and('have.class', 'bg-opacity-80')
            .and('have.class', 'text-light-text');

        cy.get('body').within(() => {
            cy.get('[data-testid="theme-wrapper"]').should('exist');
            cy.get('[data-testid="theme-wrapper"]').within(() => {
                cy.get('[data-testid="intl-provider"]').should('exist');
            });
        });
    });
});
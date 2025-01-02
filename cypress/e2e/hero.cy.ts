describe('Hero Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/fetchImages*',).as("fetchImages");
        cy.visit('/');
    });

    it('renders the hero image', () => {
        cy.wait('@fetchImages');
        cy.get('img[alt="Hero image"]').should('be.visible');
    });
});
describe('Hero Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/fetchImages*',).as("fetchImages");
        cy.visit('/');
    });

    it('renders the hero image', () => {
        cy.wait('@fetchImages');
        cy.get('img[alt="Hero image"]').should('be.visible');
    });

    it('renders the welcome message', () => {
        cy.wait('@fetchImages');
        cy.get('h1').should('have.text', 'Willkommen am Ankerplatz Lütjen-Deile');
    });

    it('renders the cta button', () => {
        cy.wait('@fetchImages');
        cy.get('a[data-testid="cta-button"]').should('have.text', 'Mehr Ansichten');
    });
});
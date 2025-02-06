describe('Hero Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the hero image', () => {
        cy.get('img[alt="Hero image of sunset over Steinhuder Meer"]').should('be.visible');
    });

    it('renders the welcome message', () => {
        cy.get('h1').should('have.text', 'Ferienhaus Panoramablick Steinhuder Meer');
    });

    it('renders the cta button', () => {
        cy.get('a[data-testid="cta-button"]').should('have.text', 'Mehr Ansichten');
    });
});
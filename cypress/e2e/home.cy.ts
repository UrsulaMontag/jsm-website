describe('Home Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/fetchImages*').as("fetchImages");
        cy.visit('/');
    });

    it('renders the header', () => {
        cy.get('header[role="banner"]').should('be.visible');
    });

    it('renders the hero image', () => {
        cy.get('img[alt="Hero image"]').should('be.visible');
    });

    it('fetches and displays images', () => {
        cy.wait('@fetchImages').then((interception: Cypress.RouteOptions) => {
            expect(interception.response!.statusCode).to.be.oneOf([200, 304]);
        });
        cy.get('img').should('have.length.greaterThan', 0);
    });

    it('has accessible hero section', () => {
        cy.get('section[aria-labelledby="hero-heading"]').should('exist');
    });
});

const asModule = {};
export default asModule;

describe('Home Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/fetchImages*').as("fetchImages");
        cy.visit('/');
    });

    it('renders the header', () => {
        cy.get('header[role="banner"]').should('be.visible');
    });

    it('renders the hero image', () => {
        cy.get('img[alt="Hero image of sunset over Steinhuder Meer"]').should('be.visible');
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

    it('renders the about house section with images and CTA button', () => {
        cy.get('section[aria-labelledby="about-house-heading"]').should('exist');
        cy.get('h2#about-house-heading').should('contain.text', 'Entdecken Sie Panoramablick');
        cy.get('p[aria-label="Erleben Sie Ruhe, Privatsphäre und Luxus im Ferienhaus Panoramablick, mit Annehmlichkeiten wie einem privaten Steg, einer Sauna und einem abgeschiedenen Garten."]').should('exist');
        cy.get('div[data-testid="about-house-image"]').should('have.length', 3);
        cy.get('a[aria-label="Explore the house gallery"]').should('exist');
    });

    it('renders the footer', () => {
        cy.get('footer').should('be.visible');
    });

});

const asModule = {};
export default asModule;

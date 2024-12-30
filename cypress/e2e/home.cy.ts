describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('renders the header', () => {
        cy.get('header[role="banner"]').should('be.visible');
    });

    it('renders the hero image', () => {
        cy.get('img[alt="Hero image"]').should('be.visible');
    });

    it('fetches and displays images', () => {
        cy.intercept('GET', '/api/fetchImages*').as('fetchImages');
        cy.wait('@fetchImages').then((interception) => {
            if (interception.response) {
                expect([200, 304]).to.include(interception.response.statusCode);
            } else {
                throw new Error('Response is undefined');
            }
        });
        cy.get('img').should('have.length.greaterThan', 0);
    })


    it('has accessible hero section', () => {
        cy.get('section[aria-labelledby="hero-heading"]').should('exist');
    });
})
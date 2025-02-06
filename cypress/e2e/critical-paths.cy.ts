describe('Critical User Paths', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
    });

    context('desktop view', () => {
        beforeEach(() => {
            cy.viewport(1024, 768);
        });

        it('allows users to navigate through main sections and interact with CTAs', () => {
            cy.get('a[data-testid="cta-button"]')
                .should('be.visible')
                .and('have.attr', 'href')
                .and('include', 'novasol.de');

            cy.get('button[aria-label="Next slide"]').click();
            cy.get('button[aria-label="Previous slide"]').click();

            cy.get('a[aria-label="Explore the house gallery"]').click();
            cy.url().should('match', /(\/gallery|\/gallerie)$/);

            cy.go('back');
            cy.wait(1000);

            cy.get('.hidden.sm\\:flex select')
                .should('be.visible')
                .select('de');

            cy.url().should('include', '/de');
            cy.get('h1').should('contain', 'Ferienhaus');
        });
    });

    context('mobile view', () => {
        beforeEach(() => {
            cy.viewport(375, 667);
        });

        it('allows users to navigate through mobile menu and change language', () => {
            cy.get('[data-testid="menu-button"]')
                .should('be.visible')
                .click();

            cy.get('ul select')
                .should('be.visible')
                .select('de');

            cy.url().should('include', '/de');
            cy.get('h1').should('contain', 'Ferienhaus');
        });
    });

    it('loads and displays all critical content sections', () => {
        const sections = [
            {selector: 'section[data-testid="hero"]', name: 'Hero'},
            {selector: 'section[aria-labelledby="location-highlight-heading"]', name: 'Location'},
            {selector: 'section[aria-labelledby="about-house-heading"]', name: 'About House'},
            {selector: 'section[aria-labelledby="highlights-heading"]', name: 'Highlights'},
            {selector: 'section[aria-labelledby="activities-heading"]', name: 'Activities'}
        ];

        sections.forEach(({selector, name}) => {
            cy.log(`Checking for ${name} section`);
            cy.get(selector)
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Found ${name} section: ${$el} elements`);
                });
        });

        cy.get('section[data-testid="hero"]')
            .within(() => {
                cy.get('h1').should('be.visible');
                cy.get('a[data-testid="cta-button"]').should('be.visible');
                cy.get('img[data-testid="hero-image"]').should('be.visible');
            });

        cy.get('[data-testid="about-house-image"]')
            .should('have.length', 3)
            .find('img')
            .each($img => {
                expect($img[0]).to.have.attr('alt', 'Panoramablick house view');
                expect($img[0]).to.have.attr('data-nimg', 'fill');
            });
    });

    it('maintains accessibility requirements', () => {
        cy.get('h1').should('have.length', 1);
        cy.get('h2').should('have.length.at.least', 4);

        cy.get('img').each($img => {
            expect($img).to.have.attr('alt');
        });

        cy.get('[aria-label]').should('have.length.at.least', 1);
        cy.get('[aria-labelledby]').should('have.length.at.least', 1);
    });
});
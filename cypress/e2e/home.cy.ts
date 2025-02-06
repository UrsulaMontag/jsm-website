describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
    });

    it('renders hero section with correct content', () => {
        cy.get('section[data-testid="hero"]').within(() => {
            cy.get('img[data-testid="hero-image"]')
                .should('be.visible')
                .and('have.attr', 'alt', 'Hero image of sunset over Steinhuder Meer');

            cy.get('h1')
                .should('be.visible')
                .and('contain', 'Ferienhaus Panoramablick Steinhuder Meer');

            cy.get('a[data-testid="cta-button"]')
                .should('be.visible')
                .and('have.attr', 'href')
                .and('include', 'novasol.de');
        });
    });

    it('renders location highlight section correctly', () => {
        cy.get('section[aria-labelledby="location-highlight-heading"]').within(() => {
            // Check heading
            cy.get('#location-highlight-heading')
                .should('be.visible')
                .and('contain', 'Wohnen unmittelbar am See');

            const features = [
                {title: 'Panoramablick', description: 'Ungestörter Ausblick auf den See'},
                {title: 'Privater Wasserzugang', description: 'Direkter Zugang zum See'},
                {title: 'Private Lage', description: 'Genießen Sie Privatsphäre'}
            ];

            cy.get('h3').should('have.length', 3);

            features.forEach(({title}) => {
                cy.contains('h3', title).should('be.visible');
            });

            cy.get('img')
                .should('have.length.at.least', 3)
                .each($img => {
                    cy.wrap($img)
                        .should('be.visible')
                        .and('have.attr', 'alt');
                });
        });
    });


    it('renders activities section with carousel', () => {
        cy.get('section[aria-labelledby="activities-heading"]').within(() => {
            cy.get('#activities-heading')
                .should('be.visible')
                .and('contain', 'Erleben Sie das Steinhuder Meer');

            // Test carousel navigation
            cy.get('button[aria-label="Next slide"]')
                .should('be.visible')
                .click();

            cy.get('button[aria-label="Previous slide"]')
                .should('be.visible')
                .click();

            cy.get('[role="group"]').should('exist');
        });
    });

    it('renders highlights section with features', () => {
        cy.get('section[aria-labelledby="highlights-heading"]').within(() => {
            cy.get('#highlights-heading')
                .should('be.visible')
                .and('contain', 'Warum Panoramablick?');

            const features = [
                'Ruderboot',
                'Garten',
                'Sauna',
                'Parken',
                'Sonnenuntergänge',
                'Hunde'
            ];

            features.forEach(feature => {
                cy.get('p').contains(new RegExp(feature, 'i'))
                    .should('be.visible');
            });
        });
    });

    it('renders about house section with gallery preview', () => {
        cy.get('section[aria-labelledby="about-house-heading"]').within(() => {
            cy.get('#about-house-heading')
                .should('be.visible')
                .and('contain', 'Entdecken Sie Panoramablick');

            cy.get('[data-testid="about-house-image"]')
                .should('have.length', 3)
                .find('img')
                .should('have.attr', 'alt', 'Panoramablick house view');

            cy.get('a[aria-label="Explore the house gallery"]')
                .should('be.visible');
        });
    });

    it('maintains proper section order', () => {
        const sections = [
            'section[data-testid="hero"]',
            'section[aria-labelledby="location-highlight-heading"]',
            'section[aria-labelledby="about-house-heading"]',
            'section[aria-labelledby="highlights-heading"]',
            'section[aria-labelledby="activities-heading"]'
        ];

        sections.forEach((section, index) => {
            if (index === 0) return;

            cy.get(sections[index - 1]).then(($prevSection: JQuery<HTMLElement>) => {
                cy.get(section).then(($currentSection: JQuery<HTMLElement>) => {
                    const prevBottom = $prevSection[0].getBoundingClientRect().bottom;
                    const currentTop = $currentSection[0].getBoundingClientRect().top;
                    expect(prevBottom).to.be.lessThan(currentTop);
                });
            });
        });
    });
});
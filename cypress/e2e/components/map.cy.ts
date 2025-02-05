/*describe('LeafMap Component', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
    });

    it('renders map with correct initial state and interaction', () => {
        cy.get('.leaflet-container')
            .should('exist')
            .and('be.visible');

        cy.get('.leaflet-tile-loaded')
            .should('exist');

        cy.get('.leaflet-marker-icon')
            .should('be.visible')
            .click();

        cy.get('.leaflet-popup-content')
            .should('be.visible')
            .and('contain', 'Ferienhaus Panoramablick');

        cy.window().then((win) => {
            // @ts-expect-error - Leaflet will be available on the window object
            const map = win.document.querySelector('.leaflet-container')?._leaflet_map;
            if (map) {
                const center = map.getCenter();
                const zoom = map.getZoom();

                expect(zoom).to.equal(19);
                expect(center.lat).to.be.closeTo(51.505, 0.001);
                expect(center.lng).to.be.closeTo(-0.09, 0.001);
            }
        });
    });
});*/
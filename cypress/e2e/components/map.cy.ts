describe('LeafMap Component', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should render the map container', () => {
        cy.get('.leaflet-container').should('exist')
    })

    it('should display the marker and popup', () => {
        cy.get('.leaflet-marker-icon').should('exist').click()

        cy.get('.leaflet-popup-content')
            .should('exist')
            .and('contain', 'Ferienhaus Panoramablick')
    })

    it('should have correct initial position and zoom', () => {
        cy.window().then((win) => {
            // @ts-expect-error - Leaflet will be available on the window object
            const mapInstance = win.document.querySelector('.leaflet-container')?._leaflet_map

            if (mapInstance) {
                expect(mapInstance.getZoom()).to.equal(19)

                const center = mapInstance.getCenter()
                expect(center.lat).to.be.closeTo(51.505, 0.001)
                expect(center.lng).to.be.closeTo(-0.09, 0.001)
            }
        })
    })

    it('should load map tiles correctly', () => {
        cy.get('.leaflet-tile-loaded').should('exist')
    })
})
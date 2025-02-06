describe('ThemeToggle Component', () => {
    beforeEach(() => {
        // Mock translations
        cy.intercept('/_next/static/locales/de/common.json', {
            "ThemeToggle": {
                "dark": "dunkel",
                "light": "hell"
            }
        });

        cy.visit('/de'); // Explicitly visit German version
        cy.clearLocalStorage();
        cy.get('[data-testid="theme-toggle"]', {timeout: 1000}).should('exist');
    });

    it('should display correct initial text', () => {
        cy.get('[data-testid="theme-toggle"] span')
            .should('contain', 'dunkel');
    });

    it('should toggle text between dunkel and hell', () => {
        cy.get('[data-testid="theme-toggle"] span')
            .should('contain', 'dunkel');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('[data-testid="theme-toggle"] span')
            .should('contain', 'hell');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('[data-testid="theme-toggle"] span')
            .should('contain', 'dunkel');
    });

    it('should persist theme preference in localStorage', () => {
        cy.window().its('localStorage.theme').should('be.undefined');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.window().its('localStorage.theme').should('eq', 'light');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.window().its('localStorage.theme').should('eq', 'dark');
    });

    it('should respect system preference when no localStorage value exists', () => {
        cy.window().then((win: Window) => {
            cy.stub(win, 'matchMedia')
                .withArgs('(prefers-color-scheme: dark)')
                .returns({
                    matches: true,
                    addListener: () => {
                    },
                    removeListener: () => {
                    },
                });
        });

        cy.reload();
        cy.get('[data-testid="theme-toggle"]', {timeout: 1000}).should('exist');

        cy.get('html').should('have.class', 'dark');
        cy.get('[data-testid="theme-toggle"] span').should('contain', 'dunkel');
    });

    it('should update the application theme when toggled', () => {
        cy.get('html').should('have.class', 'dark');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('html', {timeout: 1000}).should('not.have.class', 'dark');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('html', {timeout: 10000}).should('have.class', 'dark');
    });

    it('should maintain theme preference after page reload', () => {
        cy.get('[data-testid="theme-toggle"]').click();

        cy.reload();
        cy.get('[data-testid="theme-toggle"]', {timeout: 1000}).should('exist');
        cy.get('[data-testid="theme-toggle"] span').should('contain', 'hell');
        cy.get('html').should('not.have.class', 'dark');
    });
});
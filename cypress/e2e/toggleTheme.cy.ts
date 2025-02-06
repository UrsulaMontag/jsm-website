describe('ThemeToggle Component', () => {
    const testThemeToggle = (initialTheme: 'dark' | 'light') => {
        it(`should toggle correctly from ${initialTheme} theme`, () => {
            cy.get('[data-testid="theme-toggle"]')
                .should('exist')
                .find('span')
                .should('contain', initialTheme === 'dark' ? 'dunkel' : 'hell');

            cy.get('html').should(initialTheme === 'dark' ? 'have.class' : 'not.have.class', 'dark');

            cy.get('[data-testid="theme-toggle"]').click();
            cy.get('[data-testid="theme-toggle"] span')
                .should('contain', initialTheme === 'dark' ? 'hell' : 'dunkel');
            cy.get('html').should(initialTheme === 'dark' ? 'not.have.class' : 'have.class', 'dark');

            cy.get('[data-testid="theme-toggle"]').click();
            cy.get('[data-testid="theme-toggle"] span')
                .should('contain', initialTheme === 'dark' ? 'dunkel' : 'hell');
            cy.get('html').should(initialTheme === 'dark' ? 'have.class' : 'not.have.class', 'dark');
        });
    };

    describe('with dark theme preference', () => {
        beforeEach(() => {
            cy.clearLocalStorage().then(() => {
                cy.visit('/de', {
                    onBeforeLoad: ((win: Cypress.AUTWindow) => {
                        win.localStorage.setItem('theme', 'dark');
                    }) as Cypress.VisitOptions['onBeforeLoad']
                });
            });
            cy.get('[data-testid="theme-toggle"]').should('exist');
            cy.wait(1000);
        });

        testThemeToggle('dark');
    });

    describe('with light theme preference', () => {
        beforeEach(() => {
            cy.clearLocalStorage().then(() => {
                cy.visit('/de', {
                    onBeforeLoad: ((win: Cypress.AUTWindow) => {
                        win.localStorage.setItem('theme', 'light');
                    }) as Cypress.VisitOptions['onBeforeLoad']
                });
            });
            cy.get('[data-testid="theme-toggle"]').should('exist');
            cy.wait(1000);
        });

        testThemeToggle('light');
    });

    describe('system preference detection', () => {
        ['dark', 'light'].forEach((preference) => {
            it('should respect system preference', () => {
                cy.clearLocalStorage().then(() => {
                    cy.visit('/de', {
                        onBeforeLoad: ((win: Cypress.AUTWindow) => {
                            const originalMatchMedia = win.matchMedia;
                            win.matchMedia = (query) => {
                                if (query === '(prefers-color-scheme: dark)') {
                                    return {
                                        matches: preference === 'dark',
                                        media: query,
                                        onchange: null,
                                        addListener: () => {
                                        },
                                        removeListener: () => {
                                        },
                                        addEventListener: () => {
                                        },
                                        removeEventListener: () => {
                                        },
                                        dispatchEvent: () => true,
                                    };
                                }
                                return originalMatchMedia(query);
                            };
                        }) as Cypress.VisitOptions['onBeforeLoad']
                    });
                });

                const expectedTheme = preference === 'dark' ? 'dunkel' : 'hell';
                cy.get('[data-testid="theme-toggle"]',)
                    .should('exist')
                    .find('span')
                    .should('contain', expectedTheme);

                cy.get('html').should(preference === 'dark' ? 'have.class' : 'not.have.class', 'dark');
            });
        });
    });

    it('should persist theme preference in localStorage', () => {
        cy.clearLocalStorage().then(() => {
            cy.visit('/de', {
                onBeforeLoad: ((win: Cypress.AUTWindow) => {
                    win.localStorage.setItem('theme', 'dark');
                }) as Cypress.VisitOptions['onBeforeLoad']
            });
        });

        cy.window().then((win: Cypress.AUTWindow) => {
            expect(win.localStorage.getItem('theme')).to.equal('dark');
        });

        cy.get('[data-testid="theme-toggle"]').click();
        cy.window().then((win: Cypress.AUTWindow) => {
            expect(win.localStorage.getItem('theme')).to.equal('light');
        });

        cy.get('[data-testid="theme-toggle"]').click();
        cy.window().then((win: Cypress.AUTWindow) => {
            expect(win.localStorage.getItem('theme')).to.equal('dark');
        });
    });

    it('should update the application theme when toggled', () => {
        cy.clearLocalStorage().then(() => {
            cy.visit('/de', {
                onBeforeLoad: ((win: Cypress.AUTWindow) => {
                    win.localStorage.setItem('theme', 'dark');
                }) as Cypress.VisitOptions['onBeforeLoad']
            });
        });

        cy.get('html').should('have.class', 'dark');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('html').should('not.have.class', 'dark');

        cy.get('[data-testid="theme-toggle"]').click();
        cy.get('html').should('have.class', 'dark');
    });

    it('should maintain theme preference after page reload', () => {
        cy.clearLocalStorage().then(() => {
            cy.visit('/de', {
                onBeforeLoad: ((win: Cypress.AUTWindow) => {
                    win.localStorage.setItem('theme', 'dark');
                }) as Cypress.VisitOptions['onBeforeLoad']
            });
        });

        cy.get('[data-testid="theme-toggle"]').click();
        cy.window().then((win: Cypress.AUTWindow) => {
            expect(win.localStorage.getItem('theme')).to.equal('light');
        });

        cy.reload();
        cy.get('[data-testid="theme-toggle"]').should('exist');
        cy.wait(1000);

        cy.get('[data-testid="theme-toggle"] span').should('contain', 'hell');
        cy.get('html').should('not.have.class', 'dark');
    });
});
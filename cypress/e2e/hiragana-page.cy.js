import '@testing-library/cypress/add-commands';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Hiragana page', () => {
    it('should change to /hiragana by clicking on the tile', () => {
        cy.visit('/');
        cy.findByText(/^hiragana$/i).click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/hiragana`);
    });

    it('should be 1 selected row', () => {
        cy.visit('/hiragana');
        cy.get('[data-selected="true"]').contains(/^a$/i).should('exist');
    });

    it('should select "ma" row ', () => {
        cy.visit('/hiragana');
        cy.findByText(/^ma$/i).click();
        cy.get('[data-selected="true"]').should((rows) => {
            expect(rows).to.have.length(2);
            expect(rows[1]).to.contain('ma');
        });

        cy.visit('/');
        cy.findByText(/10\/.* selected/).should('exist');
    });
});

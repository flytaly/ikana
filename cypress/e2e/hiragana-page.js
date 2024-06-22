import '@testing-library/cypress/add-commands';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Hiragana page', () => {
    it('should change to /hiragana by clicking on the tile', () => {
        cy.visit('/')
            .findByText(/^hiragana$/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/hiragana`);
    });

    it('should be 1 selected row', () => {
        cy.get('[data-selected="true"]').should('have.length', 1).contains(/^a$/i).should('exist');
    });

    it('should select "ma" row ', () => {
        cy.findByText(/^ma$/i)
            .click()
            .get('[data-selected="true"]')
            .should((rows) => {
                expect(rows).to.have.length(2);
                expect(rows[1]).to.contain('ma');
            });
        cy.visit('/')
            .findByText(/10\/.* selected/)
            .should('exist');
    });
});

import '@testing-library/cypress/add-commands';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Katakana page', () => {
    it('should change to /katakana by clicking on the tile', () => {
        cy
            .visit('/')
            .findByText(/^katakana$/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/katakana`);
    });

    it('should be 0 selected rows', () => {
        cy
            .get('[data-selected="true"]')
            .should('have.length', 0);
    });

    it('should select "na" row', () => {
        cy.findByText(/^na$/i)
            .click()
            .get('[data-selected="true"]')
            .should('have.length', 1)
            .contains('na')
            .should('exist');
        cy
            .visit('/')
            .findByText(/5\/.* selected/i)
            .should('exist');
    });
});

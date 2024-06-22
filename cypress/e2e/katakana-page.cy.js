import '@testing-library/cypress/add-commands';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Katakana page', () => {
    it('should change to /katakana by clicking on the tile', () => {
        cy.visit('/');
        cy.findByText(/^katakana$/i).click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/katakana`);
    });

    it('should be 0 selected rows', () => {
        cy.visit('/katakana');
        cy.get('[data-selected="true"]').should('have.length', 0);
    });

    it('should select "na" row', () => {
        cy.visit('/katakana');
        cy.findByText(/^na$/i).click();
        cy.get('[data-selected="true"]').should('have.length', 1).contains('na').should('exist');

        cy.visit('/');
        cy.findByText(/5\/.* selected/i).should('exist');
    });
});

import '@testing-library/cypress/add-commands';

describe('Language Selector', () => {
    it('should change languages to Russian and persist after reload', () => {
        cy.visit('/');
        cy.findByTestId('langSelector').select('ru');
        cy.findByText('Хирагана').should('exist');

        cy.reload();
        cy.findByText('Хирагана').should('exist');
    });

    it('should change language back to English and persist after reload', () => {
        cy.visit('/');
        cy.findByTestId('langSelector').select('en');
        cy.findByText(/^hiragana$/i).should('exist');

        cy.reload();
        cy.findByText(/^hiragana$/i).should('exist');
    });
});

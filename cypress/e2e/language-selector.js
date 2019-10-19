import '@testing-library/cypress/add-commands';

describe('Language Selector', () => {
    it('should change languages to Russian and persist after reload', () => {
        cy
            .visit('/')
            .findByTestId('langSelector')
            .select('ru')
            .findByText('Хирагана')
            .should('exist')

            .reload()
            .findByText('Хирагана')
            .should('exist');
    });

    it('should change language back to English and persist after reload', () => {
        cy
            .findByTestId('langSelector')
            .select('en')
            .findByText(/^hiragana$/i)
            .should('exist')

            .reload()
            .findByText(/^hiragana$/i)
            .should('exist');
    });
});

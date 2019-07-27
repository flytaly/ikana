import '@testing-library/cypress/add-commands';

describe('Language Selector', () => {
    it('should change languages to Russian and persist after reload', () => {
        cy
            .visit('/')
            .getByTestId('langSelector')
            .select('ru')
            .getByText('Хирагана')
            .should('exist')

            .reload()
            .getByText('Хирагана')
            .should('exist');
    });

    it('should change language back to English and persist after reload', () => {
        cy
            .getByTestId('langSelector')
            .select('en')
            .getByText(/^hiragana$/i)
            .should('exist')

            .reload()
            .getByText(/^hiragana$/i)
            .should('exist');
    });
});

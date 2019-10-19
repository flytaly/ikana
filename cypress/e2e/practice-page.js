import '@testing-library/cypress/add-commands';
import KanaToRomaji from '../../data/kana-to-romaji';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Practice page', () => {
    it('should change to /practice by clicking on the tile', () => {
        cy
            .visit('/')
            .findByText(/^practice$/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/practice`);
    });

    it('should have correct default mode', () => {
        cy
            .findByTestId('activeMode')
            .should('exist')
            .should((link) => {
                expect(link.text()).to.match(/kana to romaji/i);
            });
    });

    it('should change mode', () => {
        cy
            .findByText(/romaji to kana/i)
            .click()
            .url()
            .should('eq', `${Cypress.config().baseUrl}/practice/romaji-to-kana`)
            .findByTestId('activeMode')
            .should('exist')
            .should((link) => {
                expect(link.text()).to.match(/romaji to kana/i);
            });
    });

    it('should show initial stats', () => {
        cy
            .findByTestId('statsWrong')
            .should((elem) => {
                expect(elem.text()).to.match(/^0$/);
            });
        cy
            .findByTestId('statsTime')
            .should((elem) => {
                expect(elem.text()).to.match(/^0:00$/);
            });
        cy
            .findByTestId('statsTotal')
            .should((elem) => {
                expect(elem.text()).to.match(/1\/5/);
            });
    });
});

describe('kana to romaji', () => {
    it('input should work with correct answer', () => {
        cy
            .visit('/practice/kana-to-romaji')
            .wait(200)
            .findByTestId('kana')
            .then((kana) => {
                const kanaValue = kana.get(0).textContent;
                const correctAnswer = KanaToRomaji[kanaValue][0];
                return cy
                    .findByTestId('practiceInput')
                    .type(correctAnswer)
                    .findByTestId('statsWrong')
                    .should((elem) => {
                        expect(elem.text()).to.match(/^0$/);
                    })
                    .findByTestId('statsTotal')
                    .should((elem) => {
                        expect(elem.text()).to.match(/2\/5/);
                    });
            });
    });

    it('input should work with incorrect answer', () => {
        cy
            .visit('/practice/kana-to-romaji')
            .wait(200)
            .findByTestId('practiceInput')
            .type('xa')
            .findByTestId('statsWrong')
            .should((elem) => {
                expect(elem.text()).to.match(/^1$/);
            })
            .findByTestId('statsTotal')
            .should((elem) => {
                expect(elem.text()).to.match(/1\/5/);
            });
    });
});

import '@testing-library/cypress/add-commands';
import KanaToRomaji from '../../data/kana-to-romaji';

before(() => {
    indexedDB.deleteDatabase('localforage');
});

describe('Practice page', () => {
    it('should change to /practice by clicking on the tile', () => {
        cy.visit('/');
        cy.findByText(/^practice$/i).click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/practice`);
    });

    it('should have correct default mode', () => {
        cy.visit('/practice');
        cy.findByTestId('activeMode')
            .should('exist')
            .should((link) => {
                expect(link.text()).to.match(/kana to romaji/i);
            });
    });

    it('should change mode', () => {
        cy.visit('/practice');
        cy.findByText(/romaji to kana/i).click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/practice/romaji-to-kana`);
        cy.findByTestId('activeMode')
            .should('exist')
            .should((link) => {
                expect(link.text()).to.match(/romaji to kana/i);
            });
    });

    it('should show initial stats', () => {
        cy.visit('/practice/romaji-to-kana');
        cy.findByTestId('statsWrong').should((elem) => {
            expect(elem.text()).to.match(/^0$/);
        });
        cy.findByTestId('statsTime').should((elem) => {
            expect(elem.text()).to.match(/^0:00$/);
        });
        cy.findByTestId('statsTotal').should((elem) => {
            expect(elem.text()).to.match(/1\/5/);
        });
    });
});

describe('kana to romaji', () => {
    it('input should work with correct answer', () => {
        cy.visit('/practice/kana-to-romaji');
        cy.wait(200);
        cy.findByTestId('kana').then(async (kana) => {
            const kanaValue = kana.get(0).textContent;
            const correctAnswer = KanaToRomaji[kanaValue][0];
            cy.findByTestId('practiceInput').type(correctAnswer);
            cy.findByTestId('statsWrong').should((elem) => {
                expect(elem.text()).to.match(/^0$/);
            });
            cy.findByTestId('statsTotal').should((elem) => {
                expect(elem.text()).to.match(/2\/5/);
            });
        });
    });

    it('input should work with incorrect answer', () => {
        cy.visit('/practice/kana-to-romaji');
        cy.wait(200);
        cy.findByTestId('practiceInput').type('xa');
        cy.findByTestId('statsWrong').should((elem) => {
            expect(elem.text()).to.match(/^1$/);
        });
        cy.findByTestId('statsTotal').should((elem) => {
            expect(elem.text()).to.match(/1\/5/);
        });
    });
});

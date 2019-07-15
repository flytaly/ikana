import React, { useState } from 'react';
import PropTypes from 'prop-types';
import kanaToRomaji from '../../data/kana-to-romaji';
import KanaToRomajiView from './kana-to-romaji-view';

const InitialState = {
    shift: 0,
    inputValue: '',
    correct: 0,
    wrong: 0,
    wrongChars: new Set([]),
};

const isCorrectTranslit = (kanaChar, claimant) => {
    for (const translit of kanaToRomaji[kanaChar]) {
        if (translit === claimant) return true;
        if (translit.startsWith(claimant)) return 'beginning';
    }
    return false;
};

const KanaToRomaji = ({ kanaChars }) => {
    const [{ shift, inputValue, correct, wrong }, setState] = useState(InitialState);
    const prevChar = kanaChars[shift - 1];
    const currentChar = kanaChars[shift];
    const nextChar = kanaChars[shift + 1];

    const changeHandler = (e) => {
        const value = e.target.value.trim().toLowerCase();
        const translit = isCorrectTranslit(currentChar, value);
        if (translit === true) {
            return setState(state => ({
                ...state,
                shift: state.shift + 1,
                inputValue: '',
                correct: state.correct + 1,
            }));
        }
        if (translit === false) {
            return setState(state => ({
                ...state,
                wrongChars: state.wrongChars.add(currentChar),
                inputValue: value,
                wrong: state.wrongChars.size,
            }));
        }
        return setState(state => ({ ...state, inputValue: value }));
    };

    return <KanaToRomajiView
        changeHandler={changeHandler}
        correct={correct}
        currentChar={currentChar}
        inputValue={inputValue}
        left={kanaChars.length - shift}
        nextChar={nextChar}
        prevChar={prevChar}
        wrong={wrong}
    />;
};

KanaToRomaji.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KanaToRomaji;

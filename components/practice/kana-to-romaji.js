import React, { useState } from 'react';
import PropTypes from 'prop-types';
import kanaToRomaji from '../../data/kana-to-romaji';
import KanaToRomajiView from './kana-to-romaji-view';
import FinalStatsBlock from './final-stats';
import RepeatButton from './repeat-button';
import { useGlobalState } from '../state';

const InitialState = {
    shift: 0,
    inputValue: '',
    correct: 0,
    wrong: 0,
    wrongChars: new Set([]),
    isMistake: false,
};

const isCorrectTranslit = (kanaChar, claim) => {
    for (const translit of kanaToRomaji[kanaChar]) {
        if (translit === claim) return true;
        if (translit.startsWith(claim)) return 'beginning';
    }
    return false;
};

const KanaToRomaji = ({ kanaChars }) => {
    const [{
        shift, inputValue, wrong, correct, wrongChars, isMistake,
    }, setState] = useState(InitialState);
    const prevChar = kanaChars[shift - 1];
    const currentChar = kanaChars[shift];
    const nextChar = kanaChars[shift + 1];

    // isFinalValue - if false save value without checking if this is a correct answer or not
    const inputHandler = (rawValue, isFinalValue = true) => {
        const value = rawValue.trim().toLowerCase();
        const translit = isCorrectTranslit(currentChar, value);

        if (!isFinalValue) return setState(state => ({ ...state, inputValue: value }));

        if (translit === true) {
            return setState(state => ({
                ...state,
                isMistake: false,
                shift: state.shift + 1,
                inputValue: '',
                correct: state.correct + 1,
            }));
        }
        if (translit === false) {
            return setState(state => ({
                ...state,
                isMistake: true,
                wrongChars: state.wrongChars.add(currentChar),
                inputValue: value,
                wrong: state.wrongChars.size,
            }));
        }
        return setState(state => ({ ...state, isMistake: false, inputValue: value }));
    };

    if (!kanaChars || !kanaChars.length) return <div>No kana selected</div>;

    return shift < kanaChars.length
        ? <KanaToRomajiView
            inputHandler={inputHandler}
            currentChar={currentChar}
            inputValue={inputValue}
            nextChar={nextChar}
            prevChar={prevChar}
            wrong={wrong}
            total={`${shift + 1}/${kanaChars.length}`}
            shakeIt={isMistake}
        /> : (
            <>
                <FinalStatsBlock
                    wrongChars={[...wrongChars]}
                    total={shift}
                    correct={correct}
                    wrong={wrong}
                />
                <RepeatButton clickHandler={() => { setState(InitialState); }} />
            </>);
};

KanaToRomaji.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KanaToRomaji;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import kanaToRomaji from '../../data/kana-to-romaji';
import KanaToRomajiView from './kana-to-romaji-view';
import FinalStatsBlock from './final-stats';
import RepeatButton from './repeat-button';
import { useCallbackOnKey, useTimer } from '../../utils/hooks';

const InitialState = {
    shift: 0,
    inputValue: '',
    correct: 0,
    wrong: 0,
    wrongChars: new Set([]),
    isMistake: false,
    answer: '',
    isStarted: false,
};

const isCorrectTranslit = (kanaChar, claim) => {
    for (const translit of kanaToRomaji[kanaChar]) {
        if (translit === claim) return true;
        if (translit.startsWith(claim)) return 'beginning';
    }
    return false;
};

const KanaToRomaji = ({ kanaChars, onRestart }) => {
    const [{
        shift, inputValue, wrong, correct, wrongChars, isMistake, answer, isStarted,
    }, setState] = useState(InitialState);
    const [seconds, setSeconds] = useState(0);
    const prevChar = kanaChars[shift - 1];
    const currentChar = kanaChars[shift];
    const nextChar = kanaChars[shift + 1];

    useTimer(setSeconds, isStarted);
    useCallbackOnKey('Space', () => {
        setState(state => ({
            ...state,
            wrongChars: state.wrongChars.add(currentChar),
            wrong: state.wrongChars.size,
            answer: kanaToRomaji[currentChar][0],
        }));
    });

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
                answer: '',
                isStarted: state.shift + 1 < kanaChars.length,
            }));
        }
        if (translit === false) {
            return setState(state => ({
                ...state,
                isMistake: true,
                wrongChars: state.wrongChars.add(currentChar),
                inputValue: value,
                wrong: state.wrongChars.size,
                isStarted: true,
            }));
        }
        return setState(state => ({ ...state, isMistake: false, inputValue: value, isStarted: true }));
    };

    if (!kanaChars || !kanaChars.length) return <div>No kana selected</div>;

    return !shift || isStarted
        ? <KanaToRomajiView
            inputHandler={inputHandler}
            currentChar={currentChar}
            inputValue={inputValue}
            nextChar={nextChar}
            prevChar={prevChar}
            shakeIt={isMistake}
            stats={{ wrong, total: `${shift + 1}/${kanaChars.length}`, seconds }}
            answer={answer}
            seconds={seconds}
        /> : (
            <>
                <FinalStatsBlock
                    wrongChars={[...wrongChars]}
                    total={shift}
                    correct={correct}
                    wrong={wrong}
                    seconds={seconds}
                />
                <RepeatButton clickHandler={() => { setState(InitialState); setSeconds(0); onRestart(); }} />
            </>);
};

KanaToRomaji.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRestart: PropTypes.func,
};
KanaToRomaji.defaultProps = {
    onRestart: () => {},
};

export default KanaToRomaji;

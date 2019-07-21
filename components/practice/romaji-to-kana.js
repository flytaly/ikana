import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import Quiz from './kana-quiz';
import kanaToRomaji, { hiraganaToRomaji, katakanaToRomaji, getKanaType } from '../../data/kana-to-romaji';
import FinalStatsBlock from './final-stats';
import RepeatButton from './repeat-button';
import { useTimer } from '../../utils/hooks';

const InitialState = {
    shift: 0,
    correct: 0,
    wrong: 0,
    wrongChars: new Set([]),
    disabledAnswers: [],
    isMistake: false,
    isStarted: false,
};

const pickRandomKana = (kanaData, takenKana, number) => {
    const filtered = Object.keys(kanaData).filter((kana) => {
        if (kana === takenKana) return false;
        if (kanaData[kana][0] === kanaData[takenKana][0]) {
            return false;
        }
        if (kana.length !== takenKana.length) return false;
        return true;
    });
    return shuffle(filtered).slice(0, number);
};

const useKeyDownListener = (keysListener) => {
    useEffect(() => {
        document.addEventListener('keydown', keysListener);
        return () => {
            document.removeEventListener('keydown', keysListener);
        };
    }, [keysListener]);
};

const RomajiToKana = ({ kanaChars, onRestart }) => {
    const [{
        shift, wrong, disabledAnswers, correct, wrongChars, isMistake, isStarted,
    }, setState] = useState(InitialState);
    const [seconds, setSeconds] = useState(0);
    const currentChar = kanaChars[shift];

    useTimer(setSeconds, isStarted);

    const clickHandler = useCallback((answerId) => {
        if (currentChar === answerId) {
            return setState(state => ({
                ...state,
                isMistake: false,
                shift: state.shift + 1,
                correct: state.correct + 1,
                disabledAnswers: [],
                isStarted: state.shift + 1 < kanaChars.length,
            }));
        }
        return setState(state => ({
            ...state,
            isMistake: true,
            answerId: state.wrongChars.add(currentChar),
            wrong: state.wrongChars.size,
            disabledAnswers: [...state.disabledAnswers, answerId],
            isStarted: true,
        }));
    }, [currentChar, kanaChars.length]);

    const randKanaList = useMemo(() => (currentChar ? shuffle([
        currentChar,
        ...pickRandomKana(getKanaType(currentChar) === 'hiragana' ? hiraganaToRomaji : katakanaToRomaji, currentChar, 3),
    ]) : []), [currentChar]);

    const answers = randKanaList.map(k => (
        { value: k, id: k, disabled: disabledAnswers.includes(k) }
    ));

    useKeyDownListener(useCallback((e) => {
        const KEYS = ['1', '2', '3', '4'];
        if (KEYS.includes(e.key)) {
            clickHandler(randKanaList[e.key - 1]);
        }
    }, [clickHandler, randKanaList]));

    if (!kanaChars || !kanaChars.length) return <div>No kana selected</div>;

    return !shift || isStarted
        ? <Quiz
            question={currentChar && kanaToRomaji[currentChar][0]}
            answers={answers}
            clickHandler={clickHandler}
            shakeIt={isMistake}
            stats={{ wrong, total: `${shift + 1}/${kanaChars.length}`, seconds }}
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

RomajiToKana.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRestart: PropTypes.func,
};

RomajiToKana.defaultProps = {
    onRestart: () => {},
};


export default RomajiToKana;

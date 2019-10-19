import React, { useState, useMemo, useEffect, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import Quiz from './kana-quiz';
import kanaToRomaji, { hiraganaToRomaji, katakanaToRomaji, getKanaType } from '../../data/kana-to-romaji';
import FinalStatsBlock from './final-stats';
import RepeatButton from './repeat-button';
import { useTimer } from '../../utils/hooks';
import { reducer, initReducer, actions } from './practice-state';
import { useGlobalState } from '../state';

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
    const [state, dispatch] = useReducer(reducer, { charsQueue: kanaChars }, initReducer);
    const { charsQueue, isPracticeActive, charsCount, wrongCount } = state;
    const { repeatWrongChars } = useGlobalState('options');
    const [seconds, setSeconds] = useState(0);
    const [disabledAnswers, setDisabledAnswers] = useState([]);
    const currentChar = charsQueue[0];

    useEffect(() => {
        dispatch({ type: actions.INIT, payload: { charsQueue: kanaChars } });
    }, [kanaChars]);

    useTimer(setSeconds, isPracticeActive);

    const clickHandler = useCallback((answerId) => {
        if (currentChar === answerId) {
            dispatch({ type: actions.NEXT_CHAR });
            setDisabledAnswers([]);
            return;
        }
        dispatch({ type: actions.MISTAKE, payload: { repeatWrongChars } });
        setDisabledAnswers([...disabledAnswers, answerId]);
    }, [currentChar, disabledAnswers, repeatWrongChars]);

    const randKanaList = useMemo(() => (currentChar ? shuffle([
        currentChar,
        ...pickRandomKana(getKanaType(currentChar) === 'hiragana' ? hiraganaToRomaji : katakanaToRomaji, currentChar, 3),
    ]) : []), [currentChar]);

    const answers = randKanaList.map((k) => (
        { value: k, id: k, disabled: disabledAnswers.includes(k) }
    ));

    useKeyDownListener(useCallback((e) => {
        const KEYS = ['1', '2', '3', '4'];
        if (KEYS.includes(e.key)) {
            clickHandler(randKanaList[e.key - 1]);
        }
    }, [clickHandler, randKanaList]));

    if (!kanaChars || !kanaChars.length) return <div>No kana selected</div>;

    return !charsCount || isPracticeActive
        ? <Quiz
            question={currentChar && kanaToRomaji[currentChar][0]}
            answers={answers}
            clickHandler={clickHandler}
            shakeIt={state.isMistake}
            stats={{
                wrong: wrongCount,
                total: `${charsCount + 1}/${charsCount + charsQueue.length}`,
                seconds,
            }}
        /> : (
            <>
                <FinalStatsBlock
                    wrongChars={[...state.wrongChars]}
                    total={charsCount}
                    uniqueCount={charsCount !== kanaChars.length ? kanaChars.length : null}
                    wrong={wrongCount}
                    seconds={seconds}
                />
                <RepeatButton clickHandler={() => { onRestart(); }} />
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

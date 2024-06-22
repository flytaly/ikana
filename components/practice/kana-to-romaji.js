import React, { useCallback, useEffect, useReducer, useState } from 'react';
import kanaToRomaji from '../../data/kana-to-romaji';
import { useCallbackOnKey, useTimer } from '../../utils/hooks';
import { useGlobalState } from '../state';
import FinalStatsBlock from './final-stats';
import KanaToRomajiView from './kana-to-romaji-view';
import { actions, initReducer, reducer } from './practice-state';
import RepeatButton from './repeat-button';
import useShuffledKana from './use-shuffled-kana';

const isCorrectTranslit = (kanaChar, claim) => {
    for (const translit of kanaToRomaji[kanaChar]) {
        if (translit === claim) return true;
        if (translit.startsWith(claim)) return 'beginning';
    }
    return false;
};

const KanaToRomaji = () => {
    const { shuffled: kanaChars, wasShuffled, reshuffle } = useShuffledKana();

    const [state, dispatch] = useReducer(reducer, { charsQueue: kanaChars }, initReducer);
    const { charsQueue, isPracticeActive, charsCount, wrongCount } = state;
    const { repeatWrongChars } = useGlobalState('options');
    const [seconds, setSeconds] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const currentChar = charsQueue[0];
    const nextChar = charsQueue[1];

    useEffect(() => {
        // Force  state initializing after new kanaChars were passed.
        dispatch({ type: actions.INIT, payload: { charsQueue: kanaChars } });
    }, [kanaChars]);

    useTimer(setSeconds, isPracticeActive);
    useCallbackOnKey(
        'Space',
        useCallback(
            () => dispatch({ type: actions.MISTAKE, payload: { showAnswer: true, repeatWrongChars } }),
            [repeatWrongChars],
        ),
    );

    // isFinalValue - if false save value without checking if this is a correct answer or not
    const inputHandler = (rawValue, isFinalValue = true) => {
        const value = rawValue.trim().toLowerCase();
        if (!isFinalValue) return setInputValue(value);

        const translit = isCorrectTranslit(currentChar, value);

        setInputValue(translit === true ? '' : value);

        if (translit === true) {
            // CORRECT. Go to the next char.
            return dispatch({ type: actions.NEXT_CHAR });
        }
        if (translit === false) {
            // INCORRECT.
            return dispatch({ type: actions.MISTAKE, payload: { repeatWrongChars } });
        }
        // BEGINNING. It's just a valid beginning of a character.
        return dispatch({ type: actions.CHAR_BEGINNING });
    };

    if (wasShuffled && !kanaChars?.length) return <div>No kana selected</div>;

    return !charsCount || isPracticeActive ? (
        <KanaToRomajiView
            inputHandler={inputHandler}
            currentChar={currentChar}
            inputValue={inputValue}
            nextChar={nextChar}
            prevChar={state.prevChar}
            shakeIt={state.isMistake}
            stats={{
                wrong: wrongCount,
                total: `${charsCount + 1}/${charsCount + charsQueue.length}`,
                seconds,
            }}
            answer={state.answer}
            seconds={seconds}
            charsCount={charsCount}
        />
    ) : (
        <>
            <FinalStatsBlock
                wrongChars={[...state.wrongChars]}
                total={charsCount}
                uniqueCount={charsCount !== kanaChars.length ? kanaChars.length : null}
                wrong={wrongCount}
                seconds={seconds}
            />
            <RepeatButton clickHandler={() => reshuffle()} />
        </>
    );
};

export default KanaToRomaji;

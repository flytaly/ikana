import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import Quiz from './kana-quiz';
import kanaToRomaji, { hiraganaToRomaji, katakanaToRomaji, getKanaType } from '../../data/kana-to-romaji';
import FinalStatsBlock from './final-stats';

const InitialState = {
    shift: 0,
    correct: 0,
    wrong: 0,
    wrongChars: new Set([]),
    disabledAnswers: [],
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

const RomajiToKana = ({ kanaChars }) => {
    const [{ shift, wrong, disabledAnswers, correct, wrongChars }, setState] = useState(InitialState);
    const currentChar = kanaChars[shift];

    const clickHandler = useCallback((answerId) => {
        if (currentChar === answerId) {
            return setState(state => ({
                ...state,
                shift: state.shift + 1,
                correct: state.correct + 1,
                disabledAnswers: [],
            }));
        }
        return setState(state => ({
            ...state,
            answerId: state.wrongChars.add(currentChar),
            wrong: state.wrongChars.size,
            disabledAnswers: [...state.disabledAnswers, answerId],
        }));
    }, [currentChar]);

    const randKanaList = useMemo(() => (currentChar ? shuffle([
        currentChar,
        ...pickRandomKana(getKanaType(currentChar) === 'hiragana' ? hiraganaToRomaji : katakanaToRomaji, currentChar, 3),
    ]) : []), [currentChar]);

    const answers = randKanaList.map(k => (
        { value: k, id: k, disabled: disabledAnswers.includes(k) }
    ));

    useEffect(() => {
        const keysListener = (e) => {
            const KEYS = ['1', '2', '3', '4'];
            if (KEYS.includes(e.key)) {
                clickHandler(randKanaList[e.key - 1]);
            }
        };
        document.addEventListener('keydown', keysListener);
        return () => {
            document.removeEventListener('keydown', keysListener);
        };
    }, [randKanaList, clickHandler]);

    if (!kanaChars || !kanaChars.length) return <div>No kana selected</div>;

    return shift < kanaChars.length
        ? <Quiz
            question={kanaToRomaji[currentChar][0]}
            answers={answers}
            clickHandler={clickHandler}
            wrong={wrong}
            total={`${shift + 1}/${kanaChars.length}`}
        /> : <FinalStatsBlock wrongChars={[...wrongChars]} total={shift} correct={correct} wrong={wrong} />;
};

RomajiToKana.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RomajiToKana;

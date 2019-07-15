import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import Quiz from './kana-quiz';
import kanaToRomaji, { hiraganaToRomaji, katakanaToRomaji, getKanaType } from '../../data/kana-to-romaji';

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
    const [{ shift, correct, wrong, disabledAnswers }, setState] = useState(InitialState);
    const currentChar = kanaChars[shift];

    const clickHandler = ((answerId) => {
        if (currentChar === answerId) {
            return setState(state => ({ ...state, shift: state.shift + 1, correct: correct + 1, disabledAnswers: [] }));
        }
        return setState(state => ({
            ...state,
            answerId: state.wrongChars.add(currentChar),
            wrong: state.wrongChars.size,
            disabledAnswers: [...state.disabledAnswers, answerId],
        }));
    });
    const createRandKanaList = useMemo(() => (currentChar ? shuffle([
        currentChar,
        ...pickRandomKana(getKanaType(currentChar) === 'hiragana' ? hiraganaToRomaji : katakanaToRomaji, currentChar, 3),
    ]) : []), [currentChar]);

    const answers = createRandKanaList.map(k => (
        { value: k, id: k, disabled: disabledAnswers.includes(k) }
    ));

    return shift < kanaChars.length
        ? <Quiz
            question={kanaToRomaji[currentChar][0]}
            answers={answers}
            clickHandler={clickHandler}
            correct={correct}
            wrong={wrong}
            left={kanaChars.length - shift}
        />
        : <div>That&apos;s all</div>;
};

RomajiToKana.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RomajiToKana;

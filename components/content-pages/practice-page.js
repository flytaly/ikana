import React, { useMemo } from 'react';
import styled from 'styled-components';
import shuffle from 'lodash.shuffle';
import KanaToRomaji from '../practice/kana-to-romaji';
import RomajiToKana from '../practice/romaji-to-kana';
import { NoStylesButton } from '../styled/common';
import { useGlobalState, useDispatch, types } from '../state';
import { hiraganaRows } from '../../data/hiragana';
import { katakanaRows } from '../../data/katakana';
import getSelectedKana from '../../utils/get-selected-kana';
import MODES from '../practice/modes';


const PickMode = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    > * {
        margin-right: 1rem;
    }
    > b {
        font-weight: bold;
        font-size: 1.4rem;
        padding: 0.5rem;
    }
`;

const PickModeBtn = styled(NoStylesButton)`
    border: 1px solid ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    background-color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveBgColor : theme.pickModeBtnBgColor)};
    border-radius: 5px;
    padding: 0.5rem;
    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.40);
    }
`;

const PracticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`;

const PracticePage = () => {
    const { hiragana, katakana, practiceMode: mode } = useGlobalState();
    const dispatch = useDispatch();
    const hiraganaToLearn = useMemo(
        () => getSelectedKana(hiraganaRows, hiragana.selectedRows), [hiragana.selectedRows],
    );
    const katakanaToLearn = useMemo(
        () => getSelectedKana(katakanaRows, katakana.selectedRows), [katakana.selectedRows],
    );
    const shuffledChars = shuffle([...hiraganaToLearn, ...katakanaToLearn]);
    return (
        <>
            <PickMode>
                <b>Practice mode:</b>
                <PickModeBtn
                    active={mode === MODES.KANA_TO_ROMAJI}
                    onClick={() => { dispatch({ type: types.SET_PRACTICE_MODE, payload: MODES.KANA_TO_ROMAJI }); }}
                >
                        Kana to Romaji
                </PickModeBtn>
                <PickModeBtn
                    active={mode === MODES.ROMAJI_TO_KANA}
                    onClick={() => { dispatch({ type: types.SET_PRACTICE_MODE, payload: MODES.ROMAJI_TO_KANA }); }}
                >
                        Romaji to Kana
                </PickModeBtn>
            </PickMode>
            <PracticeContainer>
                {{
                    [MODES.KANA_TO_ROMAJI]: <KanaToRomaji kanaChars={shuffledChars} />,
                    [MODES.ROMAJI_TO_KANA]: <RomajiToKana kanaChars={shuffledChars} />,
                }[mode]}
            </PracticeContainer>
        </>);
};

export default PracticePage;

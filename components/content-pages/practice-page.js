import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import shuffle from 'lodash.shuffle';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import KanaToRomaji from '../practice/kana-to-romaji';
import RomajiToKana from '../practice/romaji-to-kana';
import { useGlobalState, useDispatch, types } from '../state';
import { hiraganaRows } from '../../data/hiragana';
import { katakanaRows } from '../../data/katakana';
import getSelectedKana from '../../utils/get-selected-kana';
import MODES from '../practice/modes';
import ContentHeader from './content-header';

const PickMode = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    > * {
        margin-right: 1rem;
        margin-bottom: 0.5rem;
    }
    > b {
        font-weight: bold;
        font-size: 1.4rem;
        padding: 0.5rem;
    }
`;

const PickModeBtn = styled.a`
    border: 1px solid ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    background-color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveBgColor : theme.pickModeBtnBgColor)};
    border-radius: 5px;
    padding: 0.5rem;
    cursor: default;
    text-decoration: none;
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

const useModePicker = (prefix, mode) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const modeRoute = router.route.substr(prefix.length + 1);
    const setMode = (m) => { dispatch({ type: types.SET_PRACTICE_MODE, payload: m }); };
    if (modeRoute && modeRoute !== mode) {
        setMode(modeRoute);
        return true;
    }
    return false;
};

const PracticePage = () => {
    const prefix = '/practice';
    const { hiragana, katakana, practiceMode: mode } = useGlobalState();
    // Currently the only use case is forcing component to rerender for reshuffle
    const [, setPracticeCount] = useState(1);
    const { t } = useTranslation();
    const hiraganaToLearn = useMemo(
        () => getSelectedKana(hiraganaRows, hiragana.selectedRows), [hiragana.selectedRows],
    );
    const katakanaToLearn = useMemo(
        () => getSelectedKana(katakanaRows, katakana.selectedRows), [katakana.selectedRows],
    );

    const needRerender = useModePicker(prefix, mode);
    if (needRerender) return null;

    const shuffledChars = shuffle([...hiraganaToLearn, ...katakanaToLearn]);
    return (
        <>
            <ContentHeader>{t('practice.pageHeader')}</ContentHeader>
            <PickMode>
                <b>{t('practice.mode')}</b>
                <Link href={`${prefix}/kana-to-romaji`} legacyBehavior>
                    <PickModeBtn
                        active={mode === MODES.KANA_TO_ROMAJI}
                        data-testid={mode === MODES.KANA_TO_ROMAJI ? 'activeMode' : null}
                        href={`${prefix}/kana-to-romaji`}
                    >
                        {t('practice.kanaToRomaji')}
                    </PickModeBtn>
                </Link>
                <Link href={`${prefix}/romaji-to-kana`} legacyBehavior>
                    <PickModeBtn
                        active={mode === MODES.ROMAJI_TO_KANA}
                        data-testid={mode === MODES.ROMAJI_TO_KANA ? 'activeMode' : null}
                        href={`${prefix}/romaji-to-kana`}
                    >
                        {t('practice.romajiToKana')}
                    </PickModeBtn>
                </Link>
            </PickMode>
            <PracticeContainer>
                {process.browser ? ({
                    [MODES.KANA_TO_ROMAJI]: <KanaToRomaji
                        kanaChars={shuffledChars}
                        onRestart={() => setPracticeCount((state) => state + 1)}
                    />,
                    [MODES.ROMAJI_TO_KANA]: <RomajiToKana
                        kanaChars={shuffledChars}
                        onRestart={() => setPracticeCount((state) => state + 1)}
                    />,
                }[mode]) : null}
            </PracticeContainer>
        </>);
};

export default PracticePage;

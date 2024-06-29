import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import KanaToRomaji from '../practice/kana-to-romaji';
import MODES from '../practice/modes';
import RomajiToKana from '../practice/romaji-to-kana';
import { types, useDispatch, useGlobalState } from '../state';
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
    border: 1px solid ${({ theme, $active }) => ($active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    color: ${({ theme, $active }) => ($active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    background-color: ${({ theme, $active }) => ($active ? theme.pickModeBtnActiveBgColor : theme.pickModeBtnBgColor)};
    border-radius: 5px;
    padding: 0.5rem;
    cursor: default;
    text-decoration: none;
    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
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
    useEffect(() => {
        const modeRoute = router.route.slice(prefix.length + 1);
        if (modeRoute && modeRoute !== mode) {
            dispatch({ type: types.SET_PRACTICE_MODE, payload: modeRoute });
        }
    }, [router.route, dispatch, mode, prefix.length]);
};

function PracticePage() {
    const prefix = '/practice';
    const { practiceMode: mode } = useGlobalState();
    const { t } = useTranslation();
    useModePicker(prefix, mode);
    return (
        <>
            <ContentHeader>{t('practice.pageHeader')}</ContentHeader>
            <PickMode>
                <b>{t('practice.mode')}</b>
                <Link href={`${prefix}/kana-to-romaji`} legacyBehavior>
                    <PickModeBtn
                        $active={mode === MODES.KANA_TO_ROMAJI}
                        data-testid={mode === MODES.KANA_TO_ROMAJI ? 'activeMode' : null}
                        href={`${prefix}/kana-to-romaji`}
                    >
                        {t('practice.kanaToRomaji')}
                    </PickModeBtn>
                </Link>
                <Link href={`${prefix}/romaji-to-kana`} legacyBehavior>
                    <PickModeBtn
                        $active={mode === MODES.ROMAJI_TO_KANA}
                        data-testid={mode === MODES.ROMAJI_TO_KANA ? 'activeMode' : null}
                        href={`${prefix}/romaji-to-kana`}
                    >
                        {t('practice.romajiToKana')}
                    </PickModeBtn>
                </Link>
            </PickMode>
            <PracticeContainer>
                {
                    {
                        [MODES.KANA_TO_ROMAJI]: <KanaToRomaji />,
                        [MODES.ROMAJI_TO_KANA]: <RomajiToKana />,
                    }[mode]
                }
            </PracticeContainer>
        </>
    );
}

export default PracticePage;

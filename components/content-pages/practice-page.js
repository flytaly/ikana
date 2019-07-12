import React, { useState } from 'react';
import styled from 'styled-components';
import KanaToRomaji from '../practice/kana-to-romaji';
import RomajiToKana from '../practice/romaji-to-kana';
import { NoStylesButton } from '../styled/common';

const PickMode = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    line-height: 2.3rem;
    > * {
        margin-right: 1rem;
    }
    > b {
        font-weight: bold;
        font-size: 1.4rem;
    }
`;

const PickModeBtn = styled(NoStylesButton)`
    border: 1px solid ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveColor : theme.pickModeBtnColor)};
    background-color: ${({ theme, active }) => (active ? theme.pickModeBtnActiveBgColor : theme.pickModeBtnBgColor)};
    border-radius: 5px;
    padding: 0 0.7rem;
    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.40);
    }
`;


const MODES = { KANA_TO_ROMAJI: 'KANA_TO_ROMAJI', ROMAJI_TO_KANA: 'ROMAJI_TO_KANA' };

const PracticePage = () => {
    const [mode, setMode] = useState(MODES.KANA_TO_ROMAJI);
    return (
        <>
            <PickMode>
                <b>Practice Mode:</b>
                <PickModeBtn
                    active={mode === MODES.KANA_TO_ROMAJI}
                    onClick={() => { setMode(MODES.KANA_TO_ROMAJI); }}
                >
                        Kana to Romaji
                </PickModeBtn>
                <PickModeBtn
                    active={mode === MODES.ROMAJI_TO_KANA}
                    onClick={() => { setMode(MODES.ROMAJI_TO_KANA); }}
                >
                        Romaji to Kana
                </PickModeBtn>
            </PickMode>
            {{
                [MODES.KANA_TO_ROMAJI]: <KanaToRomaji />,
                [MODES.ROMAJI_TO_KANA]: <RomajiToKana />,
            }[mode]}
        </>);
};

export default PracticePage;

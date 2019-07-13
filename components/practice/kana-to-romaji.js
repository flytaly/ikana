import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { PracticeModeTextInput } from '../styled/inputs';
import { hiraganaToRomaji } from '../../data/hiragana';
import { SlideInLeft, SlideOutLeft } from '../styled/animations';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const KanaView = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 3rem;
    height: 11rem;
    div {
        /* outline: 1px solid lightcoral; */
        min-width: 5rem;
        text-align: center;
    }
    ${SlideInLeft}
    ${SlideOutLeft}
`;

const Kana = styled.div`
    font-size: 3rem;
    color: inherit;
    ${({ column }) => {
        // Previous character
        if (column === 0) { return css`color: lightgrey;`; }
        // Current character
        if (column === 1) {
            return css`
                font-size: 7rem;
                width: 8rem;`;
        }
        // Next character
        return css`color: grey;`;
    }}
`;


const UserInputContainer = styled.div`
    max-width: 100%;
    width: 15rem;
`;

const onAppear = (el) => {
    el.classList.add('slideIn');
    // eslint-disable-next-line no-param-reassign
    el.style.opacity = 1;
    setTimeout(() => {
        el.classList.remove('slideIn');
    }, 60);
};

const onExit = (el, i, exit) => {
    el.classList.add('slideOut');
    setTimeout(() => {
        el.classList.remove('slideOut');
        exit();
    }, 100);
};

const KanaToRomaji = ({ kanaChars }) => {
    const [shift, setShift] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const prevChar = kanaChars[shift - 1];
    const currentChar = kanaChars[shift];
    const nextChar = kanaChars[shift + 1];
    if (hiraganaToRomaji[currentChar] && hiraganaToRomaji[currentChar].includes(inputValue)) {
        setInputValue('');
        setShift(state => state + 1);
    }
    return (
        <Container>
            <Flipper
                flipKey={shift}
                spring={{ stiffness: 2000, damping: 80 }}
            >
                <KanaView>
                    {[prevChar, currentChar, nextChar].map((ch, idx) => (
                        <Flipped
                            flipId={`${ch || idx}`}
                            onAppear={onAppear}
                            onExit={onExit}
                            key={ch || idx}
                        >
                            <Kana column={idx}>{ch}</Kana>
                        </Flipped>))}
                </KanaView>
            </Flipper>
            <UserInputContainer>
                <PracticeModeTextInput
                    value={inputValue}
                    onChange={(e => setInputValue(e.target.value.trim().toLowerCase()))}
                />
            </UserInputContainer>
        </Container>);
};

KanaToRomaji.propTypes = {
    kanaChars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KanaToRomaji;

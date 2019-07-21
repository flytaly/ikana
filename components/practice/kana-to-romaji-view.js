/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';
import { PracticeModeTextInput, PracticeModeCheckBtn } from '../styled/inputs';
import { SlideInLeft, SlideOutLeft, ShakeOnError } from '../styled/animations';
import InlineStats from './inline-stats';
import { useGlobalState } from '../state';
import Media from '../media-queries';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    @media ${Media.largeEnough} {
        width: 35rem;
    }
`;

const KanaView = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 3rem;
    height: 11rem;
    div {
        /* outline: 1px solid lightcoral; */
        min-width: 8rem;
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
                word-break: keep-all;
                font-size: 7rem;
                min-width: 14rem;`;
        }
        // Next character
        return css`color: grey;`;
    }}

    ${({ shake }) => shake && ShakeOnError}
`;


const UserInputContainer = styled.div`
    display:flex;
    max-width: 100%;
    width: 18rem;
`;

const onAppear = (el) => {
    el.classList.add('slideIn');
    // eslint-disable-next-line no-param-reassign
    el.style.opacity = 1;
    setTimeout(() => {
        el.classList.remove('slideIn');
    }, 50);
};

const onExit = (el, i, exit) => {
    el.classList.add('slideOut');
    setTimeout(() => {
        el.classList.remove('slideOut');
        exit();
    }, 100);
};

const KanaToRomajiView = ({
    inputHandler,
    currentChar,
    inputValue,
    nextChar,
    prevChar,
    total,
    wrong,
    shakeIt,
}) => {
    const { disableAnimations, disableAutoInputCheck } = useGlobalState('options');
    const inputRef = useRef('');
    useEffect(() => {
        const listener = (e) => {
            if (e.code === 'Enter') {
                inputHandler(inputRef.current.value);
            }
        };
        const input = inputRef.current;
        input.addEventListener('keydown', listener);
        return () => { input.removeEventListener('keydown', listener); };
    }, [inputHandler]);

    return (
        <Container>
            <InlineStats total={total} wrong={wrong} />
            <Flipper flipKey={disableAnimations || currentChar} spring={{ stiffness: 3000, damping: 80 }}>
                <KanaView>
                    {[prevChar, currentChar, nextChar].map((ch, idx) => (
                        <Flipped
                            flipId={`${ch || idx}`}
                            onAppear={onAppear}
                            onExit={onExit}
                            key={ch || idx}
                        >
                            <Kana
                                column={idx}
                                shake={!disableAnimations && shakeIt}
                            >
                                {ch}
                            </Kana>
                        </Flipped>))}
                </KanaView>
            </Flipper>
            <UserInputContainer>
                <PracticeModeTextInput
                    value={inputValue}
                    onChange={({ target }) => inputHandler(target.value, !disableAutoInputCheck)}
                    ref={inputRef}
                    autoFocus
                />
                <PracticeModeCheckBtn
                    onClick={() => {
                        const { value } = inputRef.current;
                        inputHandler(value);
                        inputRef.current.focus();
                    }}
                >
                check
                </PracticeModeCheckBtn>
            </UserInputContainer>
        </Container>);
};

KanaToRomajiView.propTypes = {
    inputHandler: PropTypes.func,
    currentChar: PropTypes.string,
    inputValue: PropTypes.string,
    nextChar: PropTypes.string,
    prevChar: PropTypes.string,
    total: PropTypes.string,
    wrong: PropTypes.number,
    shakeIt: PropTypes.bool,
};

KanaToRomajiView.defaultProps = {
    inputHandler: () => {},
    currentChar: '',
    inputValue: '',
    nextChar: '',
    prevChar: '',
    total: '',
    wrong: 0,
    shakeIt: false,
};

export default KanaToRomajiView;

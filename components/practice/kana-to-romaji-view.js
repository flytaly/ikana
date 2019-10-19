/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
    position: relative;
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

    &::after{
        content: "${(props) => props.answer}";
        position: absolute;
        top: 100%;
        left: 0%;
        width: 100%;
        text-align: center;
        font-size: 2rem;
    }
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
    stats,
    shakeIt,
    answer,
    charsCount,
}) => {
    const { disableAnimations, disableAutoInputCheck } = useGlobalState('options');
    const inputRef = useRef('');
    const { t } = useTranslation();

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
            <InlineStats {...stats} />
            <Flipper flipKey={disableAnimations || currentChar} spring={{ stiffness: 3000, damping: 80 }}>
                <KanaView>
                    {[prevChar, currentChar, nextChar].map((ch, idx) => (
                        <Flipped
                            flipId={`${charsCount + idx - 1}`}
                            onAppear={onAppear}
                            onExit={onExit}
                            key={`${charsCount + idx - 1}`}
                        >
                            <Kana
                                column={idx}
                                shake={!disableAnimations && shakeIt}
                                answer={idx === 1 ? answer : ''}
                                data-testid={idx === 1 ? 'kana' : null}
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
                    data-testid="practiceInput"
                    autoFocus
                />
                <PracticeModeCheckBtn
                    onClick={() => {
                        const { value } = inputRef.current;
                        inputHandler(value);
                        inputRef.current.focus();
                    }}
                    title={t('practice.btnCheck_title')}
                >
                    {t('practice.btnCheck')}
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
    shakeIt: PropTypes.bool,
    stats: PropTypes.shape({}),
    answer: PropTypes.string,
    charsCount: PropTypes.number,
};

KanaToRomajiView.defaultProps = {
    inputHandler: () => {},
    currentChar: '',
    inputValue: '',
    nextChar: '',
    prevChar: '',
    shakeIt: false,
    stats: {},
    answer: '',
    charsCount: 0,
};

export default KanaToRomajiView;

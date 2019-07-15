/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { PracticeModeTextInput } from '../styled/inputs';
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
        min-width: 8rem;
        text-align: center;
    }
    ${SlideInLeft}
    ${SlideOutLeft}
`;

const Stats = styled.div`
    display: flex;
    div:not(:last-child) {
        margin-right: 1rem;
    }
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

const KanaToRomajiView = ({
    changeHandler,
    correct,
    currentChar,
    inputValue,
    left,
    nextChar,
    prevChar,
    wrong,
}) => (
    <Container>
        <Stats>
            <div>
                <span>correct:&nbsp;</span>
                <b>{correct}</b>
            </div>
            <div>
                <span>wrong:&nbsp;</span>
                <b>{wrong}</b>
            </div>
            <div>
                <span>left:&nbsp;</span>
                <b>{left}</b>
            </div>
        </Stats>
        <Flipper
            flipKey={currentChar}
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
                onChange={changeHandler}
                autoFocus
            />
        </UserInputContainer>
    </Container>);


export default KanaToRomajiView;

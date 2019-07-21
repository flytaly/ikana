import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NoStylesButton } from '../styled/common';
import InlineStats from './inline-stats';
import { ShakeOnError } from '../styled/animations';
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

const QuestionBlock = styled.div`
    margin: 0 0 3rem;
    font-size: 5rem;

    ${({ shake }) => shake && ShakeOnError}
`;

const ChoicesBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 4rem;
    width: 100%;
`;

const Choice = styled(NoStylesButton)`
    position: relative;
    padding: 1rem;
    width: calc(${({ choiceWidth }) => choiceWidth} - 0.5rem);
    min-width: 6rem;
    border: ${({ theme }) => theme.quizChoiceBorder};
    border-radius: 4px;
    text-align: center;
    margin-bottom: 1rem;
    user-select: none;
    :hover {
        background-color: ${({ theme }) => theme.quizChoiceHoverColor};
    }
    &[disabled] {
        opacity: 0.25;
    }
    &::before {
        content: "${({ choiceNumber }) => choiceNumber}";
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 1.1rem;
        color: ${({ theme }) => theme.quizChoiceNumberFontColor};
    }
`;

const Quiz = ({
    question, answers, clickHandler, columns, wrong, total, shakeIt,
}) => {
    const { disableAnimations } = useGlobalState('options');
    return (
        <Container>
            <InlineStats wrong={wrong} total={total} />
            <QuestionBlock shake={!disableAnimations && shakeIt}>{question}</QuestionBlock>
            <ChoicesBlock>
                {answers.map(({ value, disabled, id }, idx) => (
                    <Choice
                        key={id}
                        choiceWidth={`${100 / columns}%`}
                        choiceNumber={idx + 1}
                        disabled={disabled}
                        onClick={() => clickHandler(id)}
                    >
                        {value}
                    </Choice>))}
            </ChoicesBlock>
        </Container>);
};

Quiz.propTypes = {
    columns: PropTypes.number,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    clickHandler: PropTypes.func.isRequired,
    wrong: PropTypes.number,
    total: PropTypes.string,
    shakeIt: PropTypes.bool,
};

Quiz.defaultProps = {
    columns: 2,
    wrong: 0,
    total: '',
    shakeIt: false,
};


export default Quiz;

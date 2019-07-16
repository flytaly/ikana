import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NoStylesButton } from '../styled/common';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;
const StatsBlock = styled.div`
    display: flex;
    div:not(:last-child) {
        margin-right: 1rem;
    }
`;

const QuestionBlock = styled.div`
    margin: 0 0 3rem;
    font-size: 5rem;
`;

const ChoicesBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 4rem;
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
    question, answers, clickHandler, columns, correct, wrong, left,
}) => (
    <Container>
        <StatsBlock>
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
        </StatsBlock>
        <QuestionBlock>{question}</QuestionBlock>
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

Quiz.propTypes = {
    columns: PropTypes.number,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    clickHandler: PropTypes.func.isRequired,
    correct: PropTypes.number,
    wrong: PropTypes.number,
    left: PropTypes.number,
};

Quiz.defaultProps = {
    columns: 2,
    correct: 0,
    wrong: 0,
    left: 0,
};


export default Quiz;

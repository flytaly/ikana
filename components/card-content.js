import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HiraganaTable from './hiragana-table';

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 1 50rem;
    background-color: ${({ theme }) => theme.expandedCardBgColor};
    max-width: 100%;
    min-height: 30rem;
    border: 3px solid ${({ theme, cardNumber }) => theme[`cardBgColor${cardNumber}`]};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    transition: all 0.3s ease-out;
    padding: 1rem;
`;

const CardContent = ({ cardNumber, cardType }) => {
    let content;
    switch (cardType) {
        case 'hiragana':
            content = <HiraganaTable />;
            break;
        default:
            content = <span>{cardType}</span>;
    }
    return (
        <StyledContent cardNumber={cardNumber} cardType={cardType}>
            {content}
        </StyledContent>);
};

CardContent.propTypes = {
    cardNumber: PropTypes.number.isRequired,
    cardType: PropTypes.string.isRequired,
};

export default CardContent;

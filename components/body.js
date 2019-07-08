import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './styled/card-button';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5rem;
    width: 100%;
    max-width: 100%;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => (props.expanded ? 'column' : 'row')};
    justify-content: ${props => (props.expanded ? 'flex-start' : 'center')};
    max-width: 100%;
`;

const Card0 = styled(Card)`
    background-color: ${({ theme }) => theme.cardBgColor0};
`;
const Card1 = styled(Card)`
    background-color: ${({ theme }) => theme.cardBgColor1};
`;
const Card2 = styled(Card)`
    background-color: ${({ theme }) => theme.cardBgColor2};
`;

const CardContent = styled.div`
    display: flex;
    flex: 0 1 50rem;
    background-color: ${({ theme }) => theme.expandedCardBgColor};
    max-width: 100%;
    min-height: 30rem;
    border: 3px solid ${({ theme, cardId }) => theme[`cardBgColor${cardId}`]};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    transition: all 0.3s ease-out;
`;

const cardTypes = ['hiragana', 'katakana', 'settings'];

const Body = () => {
    const [{ expanded, cardId }, setState] = useState({ expanded: true, cardId: 0 });

    const makeClickHandler = id => () => {
        setState(prev => ({
            ...prev,
            cardId: id,
            expanded: !prev.expanded || cardId !== id,
        }));
    };

    return (
        <Container>
            <CardContainer expanded={expanded}>
                <Card0 onClick={makeClickHandler(0)} isBig={!expanded} />
                <Card1 onClick={makeClickHandler(1)} isBig={!expanded} />
                <Card2 onClick={makeClickHandler(2)} isBig={!expanded} />
            </CardContainer>
            {expanded ? <CardContent cardId={cardId}>{cardTypes[cardId]}</CardContent> : null}
        </Container>
    );
};

export default Body;

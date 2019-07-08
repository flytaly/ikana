import React, { useState } from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Card from './styled/card-button';
import CogIcon from '../assets/svg/cog.svg';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5rem;
    width: 100vw;
    max-width: 100vw;
    padding: 1rem;
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
        <Flipper flipKey={expanded}>
            <Container>
                <CardContainer expanded={expanded}>
                    <Flipped flipId="0">
                        <Card0
                            onClick={makeClickHandler(0)}
                            isBig={!expanded}
                            name="Hiragana"
                            shortName="あ"
                            statusLine="status"
                        />
                    </Flipped>
                    <Flipped flipId="1">
                        <Card1
                            onClick={makeClickHandler(1)}
                            isBig={!expanded}
                            name="Katakana"
                            shortName="ア"
                            statusLine="status"
                        />
                    </Flipped>
                    <Flipped flipId="2">
                        <Card2
                            onClick={makeClickHandler(2)}
                            isBig={!expanded}
                            name="Settings"
                            IconSvg={CogIcon}
                        />
                    </Flipped>
                </CardContainer>
                {expanded ? <CardContent cardId={cardId}>{cardTypes[cardId]}</CardContent> : null}
            </Container>
        </Flipper>
    );
};

export default Body;

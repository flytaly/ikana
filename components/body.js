import React, { useState } from 'react';
import styled from 'styled-components';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Card from './styled/card-button';
import CogIcon from '../assets/svg/cog.svg';
import CardContent from './card-content';

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

const cardTypes = ['hiragana', 'katakana', 'settings'];

const Body = () => {
    const [{ expanded, cardId }, setState] = useState({ expanded: false, cardId: 0 });

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
                {expanded
                    ? <CardContent cardId={cardId} cardType={cardTypes[cardId]} />
                    : null}
            </Container>
        </Flipper>
    );
};

export default Body;

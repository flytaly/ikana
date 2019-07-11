import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import Card from './styled/card-button';
import CogIcon from '../assets/svg/cog.svg';
import CardContent from './card-content';
import { useGlobalState } from './state';
import { hiraganaTotal } from '../data/hiragana';
import StartButton from './styled/start-button';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
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

const NewLineCard = styled.div`
    ${props => !props.expanded && css`
    display: flex;
    flex: 1 0 100%;
    justify-content: center;`}
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

const cardIds = ['hiragana', 'katakana', 'settings', 'practice'];

const Body = () => {
    const appState = useGlobalState();
    const router = useRouter();
    const route = router.route.slice(1);
    const cardNumber = cardIds.indexOf(route);
    const isExpanded = cardNumber !== -1;
    useEffect(() => {
        cardIds.forEach(id => route !== id && router.prefetch(`/${id}`));
    }, [route, router]);

    const clickHandler = ({ id }) => {
        if (id === route) { return router.push('/'); }
        return router.push(`/${id}`);
    };

    return (
        <Container>
            <CardContainer expanded={isExpanded}>
                <Card0
                    cardId="hiragana"
                    clickHandler={clickHandler}
                    isBig={!isExpanded}
                    name="Hiragana"
                    shortName="あ"
                    statusLine={`${appState.hiragana.totalSelected}/${hiraganaTotal} selected`}
                />
                <Card1
                    cardId="katakana"
                    clickHandler={clickHandler}
                    isBig={!isExpanded}
                    name="Katakana"
                    shortName="ア"
                    statusLine="status"
                />
                <Card2
                    cardId="settings"
                    clickHandler={clickHandler}
                    isBig={!isExpanded}
                    name="Settings"
                    IconSvg={CogIcon}
                />
                <NewLineCard expanded={isExpanded}>
                    <StartButton
                        clickHandler={() => { clickHandler({ id: 'practice' }); }}
                        isBig={!isExpanded}
                    />
                </NewLineCard>
            </CardContainer>
            {isExpanded
                ? <CardContent cardNumber={cardNumber} cardType={route} />
                : null}
        </Container>
    );
};

export default Body;

import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TileLink from './styled/tile-link';
import CogIcon from '../assets/svg/cog.svg';
import QuestionCircle from '../assets/svg/question-circle.svg';
import CardContent from './card-content';
import { useGlobalState } from './state';
import { hiraganaTotal } from '../data/hiragana';
import { katakanaTotal } from '../data/katakana';
import StartTile from './styled/start-tile';
import routes from './routes';
import Media from './media-queries';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;
    width: 100vw;
    max-width: 100vw;
    padding: 1rem;
    @media ${Media.largeEnough}{
        flex-direction: row;
    }
`;

const CardContainer = styled.aside`
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    justify-content: ${(props) => (props.$expanded ? 'flex-start' : 'center')};
    @media ${Media.largeEnough}{
        flex-direction: ${(props) => (props.$expanded ? 'column' : 'row')};
        margin: ${(props) => (props.$expanded ? '0 0 0.5rem 0' : '1rem')}
    }
`;

const NewLineCard = styled.div`
    ${(props) => !props.$expanded && css`
        display: flex;
        flex: 1 0 100%;
        justify-content: center;`}
    min-width: 5rem;
    :hover{
        z-index: 20;
    }
`;


const Body = ({ route }) => {
    const { t } = useTranslation();
    const appState = useGlobalState();
    const router = useRouter();
    const cardNumber = routes.indexOf(route);
    const isExpanded = cardNumber !== -1;
    useEffect(() => {
        routes.forEach((id) => route !== id && router.prefetch(`/${id}`));
    }, [route, router]);

    return (
        <Container>
            <CardContainer $expanded={isExpanded}>
                <TileLink
                    cardId="hiragana"
                    href="/hiragana"
                    isBig={!isExpanded}
                    name={t('hiragana.btn_label')}
                    title={t('hiragana.btn_title')}
                    shortName="あ"
                    statusLine={`${appState.hiragana.totalSelected}/${hiraganaTotal} ${t('selected')}`}
                    bgColor="cardBgColor0"
                />
                <TileLink
                    cardId="katakana"
                    href="/katakana"
                    isBig={!isExpanded}
                    name={t('katakana.btn_label')}
                    title={t('katakana.btn_title')}
                    shortName="ア"
                    statusLine={`${appState.katakana.totalSelected}/${katakanaTotal} ${t('selected')}`}
                    bgColor="cardBgColor1"
                />
                <TileLink
                    cardId="settings"
                    href="/settings"
                    isBig={!isExpanded}
                    name={t('settings.btn_label')}
                    title={t('settings.btn_title')}
                    IconSvg={CogIcon}
                    bgColor="cardBgColor2"
                />
                <TileLink
                    cardId="help"
                    href="/help"
                    isBig={!isExpanded}
                    name={t('help.btn_label')}
                    title={t('help.btn_title')}
                    IconSvg={QuestionCircle}
                    bgColor="cardBgColor4"
                />
                <NewLineCard $expanded={isExpanded}>
                    <StartTile
                        href="/practice"
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

Body.propTypes = {
    route: PropTypes.string,
};

Body.defaultProps = {
    route: '',
};

export default Body;

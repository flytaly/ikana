import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HiraganaTable from './content-pages/hiragana-table';
import KatakanaTable from './content-pages/katakana-table';
import SettingsPage from './content-pages/settings-page';
import PracticePage from './content-pages/practice-page';
import routes from './routes';
import Media from './media-queries';

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.expandedCardBgColor};
    max-width: 100%;
    min-height: 30rem;
    border: 3px solid ${({ theme, cardNumber }) => theme[`cardBgColor${cardNumber}`]};
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    transition: all 0.3s ease-out;
    padding: 1rem;
    @media ${Media.largeEnough} {
        flex: 0 1 68rem;
    }
`;

const CardContent = ({ cardNumber, cardType }) => {
    const content = ({
        hiragana: <HiraganaTable />,
        katakana: <KatakanaTable />,
        settings: <SettingsPage />,
        practice: <PracticePage />,
    }[cardType]);

    return (
        <StyledContent cardNumber={cardNumber} cardType={cardType}>
            {content}
        </StyledContent>);
};

CardContent.propTypes = {
    cardNumber: PropTypes.number.isRequired,
    cardType: PropTypes.oneOf(routes).isRequired,
};

export default CardContent;

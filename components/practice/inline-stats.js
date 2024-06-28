import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { secondsToString } from '../../utils/seconds-to-string';

const StatsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
`;

const InlineStats = ({ wrong, total, seconds = 0 }) => {
    const { t } = useTranslation();
    return (
        <StatsBlock>
            <div>
                <span>{t('practice.wrong')}</span> <b data-testid="statsWrong">{wrong}</b>
            </div>
            <div data-testid="statsTime">{secondsToString(seconds)}</div>
            <div>
                <b data-testid="statsTotal">{total}</b>
            </div>
        </StatsBlock>
    );
};

InlineStats.propTypes = {
    wrong: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
    seconds: PropTypes.number,
};

export default InlineStats;

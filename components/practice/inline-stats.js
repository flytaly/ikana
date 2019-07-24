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

const InlineStats = ({ wrong, total, seconds }) => {
    const { t } = useTranslation();
    return (
        <StatsBlock>
            <div>
                <span>{t('practice.wrong')}</span>
                {' '}
                <b>{wrong}</b>
            </div>
            <div>{secondsToString(seconds)}</div>
            <div>
                <b>{total}</b>
            </div>
        </StatsBlock>);
};

InlineStats.propTypes = {
    wrong: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
    seconds: PropTypes.number,
};

InlineStats.defaultProps = {
    seconds: 0,
};

export default InlineStats;

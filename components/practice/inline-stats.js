import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StatsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    div:not(:last-child) {
        margin-right: 1rem;
    }
    margin-bottom: 2rem;
`;


const InlineStats = ({ wrong, total }) => (
    <StatsBlock>
        <div>
            <span>wrong:&nbsp;</span>
            <b>{wrong}</b>
        </div>
        <div>
            <b>{total}</b>
        </div>
    </StatsBlock>
);

InlineStats.propTypes = {
    wrong: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
};

export default InlineStats;

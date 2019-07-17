import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import KanaToRomaji from '../../data/kana-to-romaji';

const StatsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 40rem;
    h3, h2 {
        align-self: center;
    }
`;

const StatLine = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 30rem;
    b {
        margin-right: 2rem;
    }
`;

const WrongCharsBlock = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
    grid-gap: 1.5rem;
    span {
        white-space: nowrap;
        float: left;
        margin: 0.75rem;
    }
`;

const FinalStatsBlock = ({ wrongChars, total, correct, wrong }) => (
    <StatsBlock>
        <h2>Results:</h2>
        <StatLine>
            <b>Shown:</b>
            <span>{total}</span>
        </StatLine>
        <StatLine>
            <b>Correct:</b>
            <span>{correct}</span>
        </StatLine>
        <StatLine>
            <b>Incorrect:</b>
            <span>{wrong}</span>
        </StatLine>
        {wrongChars && wrongChars.length ? (
            <>
                <h3>Incorrect symbols:</h3>
                <WrongCharsBlock>
                    {wrongChars.map(c => <span key={c}>{`${c} [${KanaToRomaji[c][0]}]`}</span>)}
                </WrongCharsBlock>
            </>)
            : null}
    </StatsBlock>
);

FinalStatsBlock.propTypes = {
    wrongChars: PropTypes.arrayOf(PropTypes.string),
    total: PropTypes.number,
    correct: PropTypes.number,
    wrong: PropTypes.number,
};

FinalStatsBlock.defaultProps = {
    wrongChars: null,
    total: null,
    correct: null,
    wrong: null,
};

export default FinalStatsBlock;

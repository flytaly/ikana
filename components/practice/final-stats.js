import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import KanaToRomaji from '../../data/kana-to-romaji';
import { secondsToString } from '../../utils/seconds-to-string';

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
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    grid-gap: 1.5rem;
    span {
        white-space: nowrap;
        float: left;
        margin: 0.75rem;
    }
`;

const countCPM = (secondsSpent, totalChars) => {
    //  Don't count first symbol because it's shown before timer starts
    const chars = totalChars > 1 ? totalChars - 1 : totalChars;
    const seconds = secondsSpent || 1;
    return Math.round((chars / seconds) * 60);
};

const FinalStatsBlock = ({
    wrongChars, total, uniqueCount, correct, wrong, seconds,
}) => {
    const { t } = useTranslation();

    return (
        <StatsBlock>
            <h2>{t('stats.results')}</h2>
            <StatLine>
                <b>{t('stats.shown')}</b>
                <span>{total}</span>
            </StatLine>

            {uniqueCount ? (
                <StatLine>
                    <b>{t('stats.unique')}</b>
                    <span>{uniqueCount}</span>
                </StatLine>)
                : null}

            {correct ? (
                <StatLine>
                    <b>{t('stats.correct')}</b>
                    <span>{correct}</span>
                </StatLine>)
                : null}


            <StatLine>
                <b>{t('stats.incorrect')}</b>
                <span>{wrong}</span>
            </StatLine>

            <StatLine>
                <b>{t('stats.time')}</b>
                <span>{secondsToString(seconds)}</span>
            </StatLine>

            <StatLine>
                <b>{t('stats.cpm')}</b>
                <span>{`≈${countCPM(seconds, total)}`}</span>
            </StatLine>

            {wrongChars && wrongChars.length ? (
                <>
                    <h3>{t('stats.incorrectList')}</h3>
                    <WrongCharsBlock>
                        {wrongChars.map((c) => <span key={c}>{`${c} [${KanaToRomaji[c][0]}]`}</span>)}
                    </WrongCharsBlock>
                </>)
                : null}
        </StatsBlock>);
};

FinalStatsBlock.propTypes = {
    wrongChars: PropTypes.arrayOf(PropTypes.string),
    total: PropTypes.number,
    correct: PropTypes.number,
    wrong: PropTypes.number,
    seconds: PropTypes.number,
    uniqueCount: PropTypes.number,
};

FinalStatsBlock.defaultProps = {
    wrongChars: null,
    total: null,
    correct: null,
    wrong: null,
    seconds: null,
    uniqueCount: null,
};

export default FinalStatsBlock;

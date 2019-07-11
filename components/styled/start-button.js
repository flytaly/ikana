import React from 'react';
import styled, { css } from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import { Play } from 'react-feather';
import PropTypes from 'prop-types';
import { BaseCard } from './card-button';

const StyledStart = styled(BaseCard)`
    flex-direction: row;
    justify-content: center;
    ${({ isBig }) => (isBig ? css`
        min-height: 0;
        min-width: 0;
    ` : css`
        width: 100%;
    `)};
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBgColor3};
    > span {
        margin-right: 1rem;
    }
`;
const StartButton = ({ isBig, clickHandler }) => (
    <Flipped flipId="startButton">
        <StyledStart
            isBig={isBig}
            title="Start practice"
            onClick={(event) => {
                clickHandler(event);
                event.target.blur();
            }}
        >
            {isBig ? (
                <Flipped inverseFlipId="startButton">
                    <span>Start</span>
                </Flipped>) : null}
            <Flipped inverseFlipId="startButton" scale>
                <Play size="1em" />
            </Flipped>
        </StyledStart>
    </Flipped>
);

StartButton.propTypes = {
    isBig: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

export default StartButton;

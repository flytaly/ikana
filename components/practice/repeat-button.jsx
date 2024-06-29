import React from 'react';
import styled from 'styled-components';
import { Repeat } from 'react-feather';
import PropTypes from 'prop-types';

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 1.4rem;
    span {
        margin-left: 0.5rem;
    }
`;

const RepeatButton = ({ clickHandler }) => (
    <Button onClick={clickHandler}>
        <Repeat size="1em" />
        <span>Repeat</span>
    </Button>
);

RepeatButton.propTypes = {
    clickHandler: PropTypes.func.isRequired,
};

export default RepeatButton;

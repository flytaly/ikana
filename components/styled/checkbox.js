import React from 'react';
import { CheckSquare, MinusSquare, Square } from 'react-feather';
import { Checkbox } from '@ariakit/react';
import PropTypes from 'prop-types';

const PickCheckboxState = (state, params) => {
    if (state === 'mixed') return <MinusSquare {...params} />;
    if (!state) return <Square {...params} />;
    return <CheckSquare {...params} />;
};

const MyCheckbox = ({ state = false, onClick = null, size = '0.8em', ...rest }) => (
    <Checkbox render={<div />} checked={state} onClick={onClick} {...rest}>
        {PickCheckboxState(state, { size })}
    </Checkbox>
);

MyCheckbox.propTypes = {
    state: PropTypes.oneOf([false, true, 'mixed']),
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MyCheckbox;

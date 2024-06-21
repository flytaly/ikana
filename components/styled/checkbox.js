import React from 'react';
import { CheckSquare, MinusSquare, Square } from 'react-feather';
import { Checkbox } from '@ariakit/react';
import PropTypes from 'prop-types';

const PickCheckboxState = (state, params) => {
    if (state === 'indeterminate') return <MinusSquare {...params} />;
    if (!state) return <Square {...params} />;
    return <CheckSquare {...params} />;
};

const MyCheckbox = ({ state, onClick, size, ...rest }) => (
    <Checkbox render={<div />} state={state} onClick={onClick} {...rest}>
        {PickCheckboxState(state, { size })}
    </Checkbox>
);

MyCheckbox.propTypes = {
    state: PropTypes.oneOf([false, true, 'indeterminate']),
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
MyCheckbox.defaultProps = {
    state: false,
    onClick: null,
    size: '0.8em',
};

export default MyCheckbox;

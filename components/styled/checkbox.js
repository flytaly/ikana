import React from 'react';
import { CheckSquare, MinusSquare, Square } from 'react-feather';
import { Checkbox } from 'reakit/Checkbox';
import PropTypes from 'prop-types';

const PickCheckboxState = (state, params) => {
    if (state === 'indeterminate') return <MinusSquare {...params} />;
    if (!state) return <Square {...params} />;
    return <CheckSquare {...params} />;
};

const MyCheckbox = ({ state, onClick, size, ...rest }) => (
    <Checkbox as="div" state={state} onClick={onClick} {...rest}>
        {PickCheckboxState(state, { size })}
    </Checkbox>
);

MyCheckbox.propTypes = {
    state: PropTypes.oneOf([false, true, 'indeterminate']),
    onClick: PropTypes.func,
    size: PropTypes.number,
};
MyCheckbox.defaultProps = {
    state: false,
    onClick: null,
    size: 15,
};


export default MyCheckbox;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio, RadioGroup, useRadioState } from 'reakit';

const StyledRadioGroup = styled(RadioGroup)`
    display: flex;
    flex-wrap: nowrap;
    input[type="radio"] {
        position: absolute;
        opacity: 0
    }
    label {
        div {
            padding: 0.5rem;
            min-width: 4rem;
            text-align: center;
            border: ${({ theme }) => theme.optionBorder};
        }
        input:checked + div {
            background-color: ${({ theme }) => theme.optionActiveColor};
            color: ${({ theme }) => theme.optionActiveFontColor};
        }

        input:focus + div {
            outline: ${({ theme }) => theme.optionFocusOutline};
        }
    }
    label:first-child div {
        border-radius: 4px 0 0 4px;
    }
    label:last-child div {
        border-radius: 0 4px 4px 0;
    }

`;

const OptionGroup = ({ options, current, changeHandler, ariaLabel }) => {
    const radio = useRadioState();
    return (
        <StyledRadioGroup
            as="div"
            {...radio}
            onChange={changeHandler}
            aria-label={ariaLabel}
        >
            {options.map(({ title, id }) => (
                <label key={id}>
                    <Radio
                        {...radio}
                        state={current}
                        value={id}
                    />
                    <div>{title}</div>
                </label>))}
        </StyledRadioGroup>
    );
};

OptionGroup.propTypes = {
    ariaLabel: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    current: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
};
OptionGroup.defaultProps = {
    ariaLabel: '',
};

export default OptionGroup;

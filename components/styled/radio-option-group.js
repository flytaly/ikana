import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Ariakit from "@ariakit/react";

const StyledRadioGroup = styled(Ariakit.RadioGroup)`
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

function OptionGroup({ options, current, changeHandler, ariaLabel='' }) {
    return (
        <Ariakit.RadioProvider>
            <StyledRadioGroup render={<div />} onChange={changeHandler} aria-label={ariaLabel}>
                {options.map(({ title, id }) => (
                    <label key={id}>
                        <Ariakit.Radio value={id} checked={id === current}  />
                        <div>{title}</div>
                    </label>
                ))}
            </StyledRadioGroup>
        </Ariakit.RadioProvider>
    );
}

OptionGroup.propTypes = {
    ariaLabel: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    current: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
};

export default OptionGroup;

import styled from 'styled-components';
import { NoStylesButton } from './common';

export const PracticeModeTextInput = styled.input.attrs({
    type: 'text',
})`
        display: block;
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 5px 0 0 5px;
        color: #4d4d4d;
        font-size: 2rem;
        text-align: center;
        padding: 0 0.3em 0.3em 0.3em ;
        background-color: transparent;
        background-color: hsl(46, 57%, 97%);

        :focus {
            outline: none;
            box-shadow: 0px 1px 0px 0px #F09600;
        }
`;

export const PracticeModeCheckBtn = styled(NoStylesButton)`
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0 5px 5px 0;
    padding: 0.5rem;
    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 1px 0px 0px #F09600;
    }
    :active {
        border: 1px solid #F09600;
    }
`;

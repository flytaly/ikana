/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const PracticeModeTextInput = styled.input.attrs({
    type: 'text',
})`
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 5px;
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

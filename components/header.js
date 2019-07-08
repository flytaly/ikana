import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
    text-transform: uppercase;
    color: ${props => props.theme.headerColor};
    text-shadow: 0px 0px 2px rgba(0,0,0,0.25);
    text-align: center;
`;

const Header = () => (
    <StyledHeader>
        TRAIN KANA
    </StyledHeader>
);

export default Header;

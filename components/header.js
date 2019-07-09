import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledHeaderLink = styled.h1`
    text-transform: uppercase;
    color: ${props => props.theme.headerColor};
    text-shadow: 0px 0px 2px rgba(0,0,0,0.25);
    text-align: center;
    a:active,
    a:hover,
    a:visited,
    a:link,
    a {
        color: inherit;
        text-decoration: none;
    }
`;

const Header = () => (
    <StyledHeaderLink>
        <Link href="/"><a href="/">TRAIN KANA</a></Link>
    </StyledHeaderLink>
);

export default Header;

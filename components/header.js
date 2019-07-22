import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledSiteHeader = styled.header`
    font-size: 2.8rem;
    margin: 2rem;
    text-transform: uppercase;
    color: ${props => props.theme.headerColor};
    text-align: center;
    text-shadow: 0px 0px 2px rgba(0,0,0,0.25);
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
    <StyledSiteHeader>
        <Link href="/"><a href="/">KANA TRAINER</a></Link>
    </StyledSiteHeader>
);

export default Header;

import React from 'react';
import styled from 'styled-components';
import { GitHub } from 'react-feather';

const StyledFooter = styled.footer`
    display: inline-block;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.footerFontColor};
    text-align: center;
    > span {
        margin-right: 1rem;
        vertical-align: middle;
    }
    svg {
        vertical-align: middle;
    }
    a:active,
    a:visited,
    a:link,
    a {
        color: inherit;
    }
    a:hover {
        color: ${({ theme }) => theme.footerHoverLinkColor};
    }
`;

const Footer = () => {
    const currentYear = (new Date()).getFullYear();
    return (
        <StyledFooter>
            <span>{currentYear}</span>
            <span>
                <a href="https://github.com/flytaly/ikana">
                    <span>Vitaly Yerofeyevsky </span>
                </a>
            </span>
            <span>
                <a href="https://github.com/flytaly/ikana" title="source code on github">
                    <GitHub size="1.2em" />
                </a>
            </span>
        </StyledFooter>);
};

export default Footer;

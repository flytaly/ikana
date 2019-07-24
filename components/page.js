import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { normalize } from 'styled-normalize';
import { useSSR } from 'react-i18next';
import Meta from './meta';
import theme from './themes/default';
import { resources } from '../i18n';

const StyledPage = styled.div`
  color: black;
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    height: 100%;
    min-height: 100vh;
    font-size: 62.5%;
  }
  body {
    max-width: 100vw;
    background: ${props => props.theme.pageBackground};
    font-size: 1.4rem;
    font-family: ${props => props.theme.mainFont};
  }
`;

const Page = ({ children, lang }) => {
    // This hook works only once because it sets value 'initializedLanguageOnce'
    // so it's safe to use it on every client-side render. It would still be the same
    // initial value anyway.
    useSSR(resources, lang);
    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <GlobalStyle />
                <Meta />
                {children}
            </StyledPage>
        </ThemeProvider>
    );
};

Page.propTypes = {
    children: PropTypes.element.isRequired,
    lang: PropTypes.string,
};

Page.defaultProps = {
    lang: 'en',
};

export default Page;

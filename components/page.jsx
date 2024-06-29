import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { normalize } from 'styled-normalize';
import Meta from './meta';
import theme from './themes/default';

const StyledPage = styled.div`
    color: black;
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    /* Only Hiragana and Katakana characters */
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Noto Sans Japanese Regular'), local('NotoSansJapanese-Regular'),
        url('/static/fonts/noto-sans-jp-regular-kana-only.woff2') format('woff2'),
        url('/static/fonts/noto-sans-jp-regular-kana-only.woff') format('woff');
    unicode-range: U+3041-30FE;
  }

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
    background: ${(props) => props.theme.pageBackground};
    font-size: 1.4rem;
    font-family: ${(props) => props.theme.mainFont};
  }
`;

const Page = ({ children }) => (
    <ThemeProvider theme={theme}>
        <StyledPage>
            <GlobalStyle />
            <Meta />
            {children}
        </StyledPage>
    </ThemeProvider>
);

Page.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Page;

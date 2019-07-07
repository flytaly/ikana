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

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    height: 100%;
    min-height: 100vh;
    font-size: 62.5%;
  }
  body {
    background: ${props => props.theme.pageBackground};
    font-size: 1.3rem;
    font-family: ${props => props.theme.mainFont};
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
    children: PropTypes.element.isRequired,
};

export default Page;

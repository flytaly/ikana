import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Body from './body';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const Home = props => (
    <PageContainer>
        <Header />
        <Body {...props} />
    </PageContainer>
);

export default Home;

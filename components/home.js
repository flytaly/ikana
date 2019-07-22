import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Header from './header';
import Body from './body';
import Greeting from './greeting';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Home = (props) => {
    const router = useRouter();
    return (
        <PageContainer>
            <Header />
            {router.route === '/' ? <Greeting>Hello</Greeting> : null}
            <Body {...props} />
        </PageContainer>
    );
};

export default Home;

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Header from './header';
import Body from './body';
import Greeting from './greeting';
import Footer from './footer';
import LangSelector from './lang-selector';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;
const PushToBottom = styled.div`
    flex: 1 0 2rem;
`;

const Home = (props) => {
    const router = useRouter();
    return (
        <PageContainer>
            <Header />
            {router.route === '/' ? <Greeting /> : null}
            <Body {...props} />
            <PushToBottom />
            <LangSelector />
            <Footer />
        </PageContainer>
    );
};

export default Home;

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    padding: 1rem;
    font-size: 1.5rem;
    width: 50rem;
    max-width: 100%;
    text-align: center;
    box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.headerColor};
    line-height: normal;
    h1 {
        font-size: 1em;
        margin: 0 0 1rem 0;
    }
`;

const Greeting = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <h1>{t('rootPageMessages.header')}</h1>
            <div>
                <span>{t('rootPageMessages.description')}</span>
            </div>
        </Container>
    );
};

export default Greeting;

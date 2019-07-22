import React from 'react';
import styled from 'styled-components';
import ContentHeader from './content-header';

const InfoBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: 35rem;
    max-width: 100%;
    h2 {
        font-size: 1.5rem;
        align-self: flex-start;
    }
`;

const About = () => (
    <>
        <ContentHeader>About</ContentHeader>
        <InfoBlock>
                Information
        </InfoBlock>
    </>);

export default About;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    /* border: 1px solid lightgrey; */
    /* border-radius: 4px; */
    /* background-color: ${({ theme }) => theme.expandedCardBgColor}; */
    padding: 0.5rem;
    max-width: 100%;
    text-align: center;
    box-shadow: 0px 0px 3px 1px #087FA3;
    > p {
        margin: 1rem;
    }
`;

const Greeting = () => (
    <Container>
        <b>Practice japanese syllables</b>
        <p>
            <span>Pick Hiragana and Katakana syllables and press "start"</span>
            <br />
        </p>
    </Container>
);

export default Greeting;

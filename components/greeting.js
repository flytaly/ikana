import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
    font-size: 1.5rem;
    max-width: 100%;
    text-align: center;
    box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.headerColor};
    p {
        margin: 0;
    }
    > p:not(:first-child) {
        margin-top: 1rem;
    }
    h1 {
        font-size: 1em;
        margin: 0;
    }
`;

const Greeting = () => (
    <Container>
        <p><h1>Practice japanese syllables</h1></p>
        <p>
            <span>Pick Hiragana or Katakana syllables and click start</span>
        </p>
    </Container>
);

export default Greeting;

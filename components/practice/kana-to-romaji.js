import React from 'react';
import styled from 'styled-components';
import { PracticeModeTextInput } from '../styled/inputs';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const CurrentKana = styled.span`
    font-size: 7rem;
    margin: 0 0 3rem;
    min-height: 10rem;
`;

const UserInputContainer = styled.div`
    max-width: 100%;
    width: 15rem;
`;

const KanaToRomaji = () => (
    <Container>
        <CurrentKana />
        <UserInputContainer>
            <PracticeModeTextInput />
        </UserInputContainer>
    </Container>
);

export default KanaToRomaji;

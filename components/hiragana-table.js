import React from 'react';
import styled from 'styled-components';
import Table from './styled/kana-table';
import { hiraganaRows, hiraganaToRomaji } from '../data/hiragana';

const ContentHeader = styled.h3`
    align-self: center;
`;
const TablesContainer = styled.div`
    display: flex;
    justify-content: center;
    > * {
        margin: 0 1rem;
    }
`;

const Hiragana = () => (
    <>
        <ContentHeader>Hiragana</ContentHeader>
        <TablesContainer>
            <Table
                data={hiraganaRows}
            />
        </TablesContainer>
    </>
);

export default Hiragana;

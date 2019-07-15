import React from 'react';
import styled from 'styled-components';
import Table from '../styled/kana-table';
import { hiraganaRows, kanaTypes } from '../../data/hiragana';
import { useGlobalState, useDispatch, types } from '../state';
import { TablesContainer, TableInColumn } from '../styled/kana-tables-grid';

const ContentHeader = styled.h3`
    align-self: center;
`;

const Hiragana = () => {
    const hiragana = useGlobalState('hiragana');
    const dispatch = useDispatch();

    const makeClickHandler = kanaType => ({ rowIdx }) => {
        dispatch({ type: types.HIRAGANA_TOGGLE_ROW, payload: { rowIdx, kanaType } });
    };
    const makeSelectAllHandler = kanaType => () => {
        dispatch({ type: types.HIRAGANA_TOGGLE_ALL, payload: { kanaType } });
    };

    return (
        <>
            <ContentHeader>Hiragana</ContentHeader>
            <TablesContainer>
                <Table
                    data={hiraganaRows.monographs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.monographs)}
                    onRowClick={makeClickHandler(kanaTypes.monographs)}
                    tableHeader="Monographs"
                    selectedRows={hiragana.selectedRows.monographs}
                    withCheckbox
                />
                <TableInColumn>
                    <Table
                        data={hiraganaRows.diacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.diacritics)}
                        onRowClick={makeClickHandler(kanaTypes.diacritics)}
                        tableHeader="with Diacritics"
                        selectedRows={hiragana.selectedRows.diacritics}
                        withCheckbox
                    />
                    <Table
                        data={hiraganaRows.digraphsDiacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.digraphsDiacritics)}
                        onRowClick={makeClickHandler(kanaTypes.digraphsDiacritics)}
                        tableHeader="with Diacritics"
                        selectedRows={hiragana.selectedRows.digraphsDiacritics}
                        withCheckbox
                    />
                </TableInColumn>
                <Table
                    data={hiraganaRows.digraphs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.digraphs)}
                    onRowClick={makeClickHandler(kanaTypes.digraphs)}
                    tableHeader="Digraphs"
                    selectedRows={hiragana.selectedRows.digraphs}
                    withCheckbox
                />

            </TablesContainer>
        </>);
};

export default Hiragana;

import React from 'react';
import styled from 'styled-components';
import Table from '../styled/kana-table';
import { katakanaRows, kanaTypes } from '../../data/katakana';
import { useGlobalState, useDispatch, types } from '../state';
import { TablesContainer, TableInColumn } from '../styled/kana-tables-grid';

const ContentHeader = styled.h3`
    align-self: center;
`;

const Katakana = () => {
    const katakana = useGlobalState('katakana');
    const dispatch = useDispatch();

    const makeClickHandler = kanaType => ({ rowIdx }) => {
        dispatch({ type: types.KATAKANA_TOGGLE_ROW, payload: { rowIdx, kanaType } });
    };
    const makeSelectAllHandler = kanaType => () => {
        dispatch({ type: types.KATAKANA_TOGGLE_ALL, payload: { kanaType } });
    };

    return (
        <>
            <ContentHeader>Katakana</ContentHeader>
            <TablesContainer>
                <Table
                    data={katakanaRows.monographs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.monographs)}
                    onRowClick={makeClickHandler(kanaTypes.monographs)}
                    tableHeader="Monographs"
                    selectedRows={katakana.selectedRows.monographs}
                    withCheckbox
                />
                <TableInColumn>
                    <Table
                        data={katakanaRows.diacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.diacritics)}
                        onRowClick={makeClickHandler(kanaTypes.diacritics)}
                        tableHeader="with Diacritics"
                        selectedRows={katakana.selectedRows.diacritics}
                        withCheckbox
                    />
                    <Table
                        data={katakanaRows.digraphsDiacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.digraphsDiacritics)}
                        onRowClick={makeClickHandler(kanaTypes.digraphsDiacritics)}
                        tableHeader="with Diacritics"
                        selectedRows={katakana.selectedRows.digraphsDiacritics}
                        withCheckbox
                    />
                </TableInColumn>
                <Table
                    data={katakanaRows.digraphs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.digraphs)}
                    onRowClick={makeClickHandler(kanaTypes.digraphs)}
                    tableHeader="Digraphs"
                    selectedRows={katakana.selectedRows.digraphs}
                    withCheckbox
                />

            </TablesContainer>
        </>);
};

export default Katakana;

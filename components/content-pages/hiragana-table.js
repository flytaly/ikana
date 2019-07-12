import React from 'react';
import styled from 'styled-components';
import Table, { CellContent } from '../styled/kana-table';
import { hiraganaRows, hiraganaToRomaji, kanaTypes } from '../../data/hiragana';
import { useGlobalState, useDispatch, types } from '../state';

const ContentHeader = styled.h3`
    align-self: center;
`;
const TablesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    > * {
        margin: 1rem 1rem;
    }
`;

const Hiragana = () => {
    const hiragana = useGlobalState('hiragana');
    const dispatch = useDispatch();

    const makeOnRowClick = kanaType => ({ rowIdx }) => {
        dispatch({ type: types.hiraganaToggleRow, payload: { rowIdx, kanaType } });
    };
    const makeOnSelectAll = kanaType => () => {
        dispatch({ type: types.hiraganaToggleAll, payload: { kanaType } });
    };

    return (
        <>
            <ContentHeader>Hiragana</ContentHeader>
            <TablesContainer>
                <Table
                    data={hiraganaRows.monographs}
                    onSelectAll={makeOnSelectAll(kanaTypes.monographs)}
                    onRowClick={makeOnRowClick(kanaTypes.monographs)}
                    tableHeader="Monographs"
                    withCheckbox
                    selectedRows={hiragana.selectedRows.monographs}
                    cellRenderer={({ cell, columnIdx, rowIdx }) => {
                        const key = `${columnIdx}_${rowIdx}`;
                        const romaji = Array.isArray(hiraganaToRomaji[cell])
                            ? hiraganaToRomaji[cell][0]
                            : hiraganaToRomaji[cell];
                        if (!cell) { return <td key={key} />; }
                        return (
                            <td key={key}>
                                <CellContent>
                                    <div>{cell}</div>
                                    <div>{romaji}</div>
                                </CellContent>
                            </td>);
                    }}
                />
                <Table
                    data={hiraganaRows.diacritics}
                    onSelectAll={makeOnSelectAll(kanaTypes.diacritics)}
                    onRowClick={makeOnRowClick(kanaTypes.diacritics)}
                    tableHeader="Diacritics"
                    withCheckbox
                    selectedRows={hiragana.selectedRows.diacritics}
                    cellRenderer={({ cell, columnIdx, rowIdx }) => {
                        const key = `${columnIdx}_${rowIdx}`;
                        const romaji = Array.isArray(hiraganaToRomaji[cell])
                            ? hiraganaToRomaji[cell][0]
                            : hiraganaToRomaji[cell];
                        if (!cell) { return <td key={key} />; }
                        return (
                            <td key={key}>
                                <CellContent>
                                    <div>{cell}</div>
                                    <div>{romaji}</div>
                                </CellContent>
                            </td>);
                    }}
                />
            </TablesContainer>
        </>);
};

export default Hiragana;
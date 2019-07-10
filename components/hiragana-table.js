import React, { useCallback } from 'react';
import styled from 'styled-components';
import Table, { CellContent } from './styled/kana-table';
import { hiraganaRows, hiraganaToRomaji } from '../data/hiragana';
import { useGlobalState, useDispatch, types } from './state';

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

const Hiragana = () => {
    const hiragana = useGlobalState('hiragana');
    const dispatch = useDispatch();

    const onRowClick = useCallback(({ rowIdx }) => {
        dispatch({ type: types.hiraganaToggleRow, payload: rowIdx });
    }, [dispatch]);
    const onSelectAll = useCallback(() => {
        dispatch({ type: types.hiraganaToggleAll });
    }, [dispatch]);

    return (
        <>
            <ContentHeader>Hiragana</ContentHeader>
            <TablesContainer>
                <Table
                    data={hiraganaRows}
                    onSelectAll={onSelectAll}
                    onRowClick={onRowClick}
                    tableHeader="Monographs"
                    withCheckbox
                    selectedRows={hiragana.selectedRows}
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

/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Checkbox from './checkbox';
import kanaToRomaji from '../../data/kana-to-romaji';

const StyledTable = styled.table`
    font-size: 2rem;
    border-collapse: collapse;
    cursor: default;
`;

export const StyledRow = styled.tr`
    ${(props) => (props.selected && css`background-color: ${props.theme.kanaTableRowSelectedColor};`)}
    :not(:last-child) {
        border-bottom: ${({ theme }) => theme.kanaTableBorder};
    }
    :hover {
        background-color: ${({ theme, selected }) => (selected ? theme.kanaTableRowHoverSelectedColor : theme.kanaTableRowHoverColor)};
    }
`;

export const RowHeaderCell = styled.th.attrs({ scope: 'row' })`
`;

export const TableHeaderRow = styled.tr`
    border: 1px solid rgba(0,0,0,0.40);
    background-color: rgba(0,0,0,0.05);
`;
export const TableSpanHeader = styled.th.attrs({ colSpan: '100%' })`
    font-size: 1.5rem;
`;

export const CellContent = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        color: ${(props) => props.theme.kanaTableCellColor};
        > :first-child {
            font-size: 2rem;
        }
        > :not(:first-child) {
            font-size: 1.4rem;
            color: ${(props) => props.theme.kanaTableCellColor2};
        }
`;

const kanaRomajiCellRenderer = ({ cell, columnIdx, rowIdx }) => {
    const key = `${columnIdx}_${rowIdx}`;
    if (!cell) { return <td key={key} />; }
    const romaji = kanaToRomaji[cell] && kanaToRomaji[cell][0];
    return (
        <td key={key}>
            <CellContent>
                <div>{cell}</div>
                <div>{romaji}</div>
            </CellContent>
        </td>);
};


const defaultRowRenderer = ({
    rowData, rowIdx, cellRenderer, onRowClick, selectedRows, rowHeaderCell,
}) => {
    const isSelected = selectedRows.includes(rowIdx);
    return (
        <StyledRow
            onClick={(event) => onRowClick({ event, rowIdx })}
            key={rowIdx}
            selected={isSelected}
            data-selected={isSelected}
        >
            {rowHeaderCell && rowHeaderCell({ rowIdx }) }
            {rowData.map((cell, columnIdx) => (
                cellRenderer({ cell, rowIdx, columnIdx })
            ))}
        </StyledRow>
    );
};

const getSelectAllState = (rows, selectedRows) => {
    if (!selectedRows.length) return false;
    if (rows.length > selectedRows.length) return 'mixed';
    return true;
};

const KanaTable = ({
    cellRenderer = kanaRomajiCellRenderer,
    data,
    onRowClick = () => {},
    onSelectAll = () => {},
    rowRenderer = defaultRowRenderer,
    selectedRows = [],
    tableHeader = '',
    withCheckbox = false,
}) => {
    const checkBoxRenderer = ({ rowIdx }) => (
        <RowHeaderCell>
            <Checkbox
                onClick={(event) => {
                    event.stopPropagation();
                    onRowClick({ event, rowIdx });
                }}
                state={selectedRows.includes(rowIdx)}
            />
        </RowHeaderCell>);
    const rowHeaderCell = withCheckbox ? checkBoxRenderer : null;
    return (
        <div>
            <StyledTable>
                <thead>
                    <TableHeaderRow onClick={onSelectAll}>
                        {withCheckbox ? (
                            <th>
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onSelectAll();
                                    }}
                                    state={getSelectAllState(data, selectedRows)}
                                    title="Select all"
                                />
                            </th>) : null}
                        <TableSpanHeader>{tableHeader}</TableSpanHeader>
                    </TableHeaderRow>
                </thead>
                <tbody>
                    {data.map((rowData, rowIdx) => rowRenderer({
                        rowData, rowIdx, cellRenderer, onRowClick, selectedRows, rowHeaderCell,
                    })) }
                </tbody>
            </StyledTable>
        </div>);
};

KanaTable.propTypes = {
    cellRenderer: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    onRowClick: PropTypes.func,
    onSelectAll: PropTypes.func,
    rowRenderer: PropTypes.func,
    selectedRows: PropTypes.arrayOf(PropTypes.number),
    tableHeader: PropTypes.string,
    withCheckbox: PropTypes.bool,
};

export default KanaTable;

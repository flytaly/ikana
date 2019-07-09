/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledTable = styled.table`
    font-size: 2rem;
    border-collapse: collapse;
    cursor: default;
`;

export const StyledRow = styled.tr`
    ${props => (props.selected && css`background-color: ${props.theme.kanaTableRowSelectedColor};`)}
    :not(:last-child) {
        border-bottom: ${({ theme }) => theme.kanaTableBorder};
    }
    :hover {
        background-color: ${({ theme }) => theme.kanaTableRowHoverColor};
    }
`;

export const CellContent = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        color: ${props => props.theme.kanaTableCellColor};
        > :first-child {
            font-size: 2rem;
        }
        > :not(:first-child) {
            font-size: 1.4rem;
            color: ${props => props.theme.kanaTableCellColor2};
        }
`;

const defaultCellRenderer = ({ cell, columnIdx, rowIdx }) => (
    <td key={`${rowIdx}_${columnIdx}`}>{cell}</td>);

const defaultRowRenderer = ({ rowData, rowIdx, cellRenderer, onRowClick, selectedRows }) => (
    <StyledRow
        onClick={event => onRowClick({ event, rowIdx })}
        key={rowIdx}
        selected={selectedRows.includes(rowIdx)}
    >
        {rowData.map((cell, columnIdx) => (
            cellRenderer({ cell, rowIdx, columnIdx })
        ))}
    </StyledRow>
);

const KanaTable = ({ data, rowRenderer, cellRenderer, onRowClick, selectedRows }) => (
    <div>
        <StyledTable>
            <tbody>
                {data.map((rowData, rowIdx) => rowRenderer({
                    rowData, rowIdx, cellRenderer, onRowClick, selectedRows,
                })) }
            </tbody>
        </StyledTable>
    </div>
);

KanaTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    cellRenderer: PropTypes.func,
    rowRenderer: PropTypes.func,
    onRowClick: PropTypes.func,
    selectedRows: PropTypes.arrayOf(PropTypes.number),
};
KanaTable.defaultProps = {
    cellRenderer: defaultCellRenderer,
    rowRenderer: defaultRowRenderer,
    onRowClick: () => {},
    selectedRows: [],
};

export default KanaTable;

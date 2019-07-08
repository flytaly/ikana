/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTable = styled.table`
    font-size: 2rem;
    border-collapse: collapse;
    cursor: default;
`;

const StyledRow = styled.tr`
    :not(:last-child) {
        border-bottom: ${({ theme }) => theme.kanaTableBorder};
    }
    :hover {
        background-color: ${({ theme }) => theme.kanaTableRowHoverColor};
    }
`;

const StyledCell = styled.td`
`;

// eslint-disable-next-line react/prop-types
const defaultCellRenderer = ({ cell, columnIdx, rowIdx }) => (
    <StyledCell key={`${rowIdx}_${columnIdx}`}>{cell}</StyledCell>);

const KanaTable = ({ data, cellRenderer }) => (
    <div>
        <StyledTable>
            <tbody>
                {data.map((row, rowIdx) => (
                    <StyledRow key={rowIdx}>
                        {row.map((cell, columnIdx) => (
                            cellRenderer({ cell, rowIdx, columnIdx })
                        ))}
                    </StyledRow>
                ))}
            </tbody>
        </StyledTable>
    </div>
);

KanaTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    cellRenderer: PropTypes.func,
};
KanaTable.defaultProps = {
    cellRenderer: defaultCellRenderer,
};

export default KanaTable;

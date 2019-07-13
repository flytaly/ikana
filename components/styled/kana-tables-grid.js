import styled from 'styled-components';

export const TablesContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: flex-start;
    > * {
        margin: 1rem;
    }
`;
export const TableInColumn = styled.div`
    display: flex;
    flex-direction: column;
    > *:not(:last-child) {
        margin-bottom: 2.5rem;
    }
`;

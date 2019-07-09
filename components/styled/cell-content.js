import styled from 'styled-components';

const CellContent = styled.div`
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

export default CellContent;

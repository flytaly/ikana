import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flipped } from 'react-flip-toolkit';
import { NoStylesButton } from './common';

export const BaseCard = styled(NoStylesButton)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: ${({ isBig }) => (isBig ? '20rem' : '6rem')};
    min-width: ${({ isBig }) => (isBig ? '20rem' : '5rem')};
    padding: ${({ isBig }) => (isBig ? '2rem 1.5rem 1rem 1.5rem' : '1rem')};
    cursor: default;
    color: ${({ theme }) => theme.cardTextColor};
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 0px 0px 5px rgba(0,0,0,0.75);
    box-shadow:  ${({ isBig }) => (isBig
        ? '0px 0px 5px 0px rgba(0,0,0,0.75)'
        : '-2px 0px 5px 0px rgba(0,0,0,0.75)')};
    margin: ${({ isBig }) => (isBig ? '1rem' : '0 0 1rem 0')};
    z-index: 20;
    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.50);
    }
`;

const Name = styled.div`
    font-size: 3rem;
    text-transform: uppercase;
`;
const Icon = styled.div`
    font-size: 4rem;
    display: flex;
    align-items: center;
    svg {
        fill: ${({ theme }) => theme.cardTextColor};
        width: 4rem;
        height: 4rem;
    }
`;
const Status = styled.div`
    font-size: 1.4rem;
    align-self: flex-start;
    font-weight: normal;
`;

const CardButton = ({
    clickHandler, isBig, name, shortName, statusLine, IconSvg, cardId, ...rest
}) => (
    <Flipped flipId={cardId}>
        <BaseCard
            onClick={(event) => {
                clickHandler({ event, id: cardId });
                event.target.blur();
            }}
            isBig={isBig}
            title={name}
            {...rest}
        >
            {isBig ? <Name>{name}</Name> : null}
            <Flipped inverseFlipId={cardId} scale>
                <Icon>{IconSvg ? <IconSvg /> : <span>{shortName}</span>}</Icon>
            </Flipped>
            {isBig ? <Status>{statusLine || <span>&nbsp;</span>}</Status> : null }
        </BaseCard>
    </Flipped>);

CardButton.propTypes = {
    cardId: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    isBig: PropTypes.bool,
    name: PropTypes.string,
    shortName: PropTypes.string,
    statusLine: PropTypes.string,
    IconSvg: PropTypes.func,
};

CardButton.defaultProps = {
    clickHandler: () => {},
    isBig: true,
    name: '',
    shortName: '',
    statusLine: '',
    IconSvg: null,
};

export default CardButton;

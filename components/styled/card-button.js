import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flipped } from 'react-flip-toolkit';
import { NoStylesButton } from './common';
import Media from '../media-queries';

export const BaseCard = styled(NoStylesButton)`
    display: flex;
    flex-direction: column;
    justify-content: ${({ isBig }) => (isBig ? 'space-between' : 'center')};
    align-items: center;
    min-height: ${({ isBig }) => (isBig ? '15rem' : '5rem')};
    min-width: ${({ isBig }) => (isBig ? '15rem' : '4rem')};
    padding: ${({ isBig }) => (isBig ? '1.5rem 1.5rem 1rem 1.5rem' : '1rem')};
    cursor: default;
    color: ${({ theme }) => theme.cardTextColor};
    background-color: ${({ theme, bgColor }) => bgColor && theme[bgColor]};
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0px 0px 5px rgba(0,0,0,0.75);
    box-shadow:  ${({ isBig }) => (isBig
        ? '0px 0px 5px 0px rgba(0,0,0,0.75)'
        : '-2px 0px 5px 0px rgba(0,0,0,0.75)')};
    margin: ${({ isBig }) => (isBig ? '1rem' : '0 0.5rem 0 0')};

    :hover,
    :focus {
        outline: none;
        box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.50);
        z-index: 20;
    }
    @media ${Media.largeEnough}{
        margin: ${({ isBig }) => (isBig ? '1rem' : '0 0 0.5rem 0')};
        min-height: ${({ isBig }) => (isBig ? '20rem' : '6rem')};
        min-width: ${({ isBig }) => (isBig ? '20rem' : '5rem')};
        padding: ${({ isBig }) => (isBig ? '2rem 1.5rem 1rem 1.5rem' : '1rem')};
        font-size: 3rem;
    }
`;

const Name = styled.div`
    text-transform: uppercase;
`;

const Icon = styled.div`
    font-size: 3rem;
    display: flex;
    align-items: center;
    svg {
        fill: ${({ theme }) => theme.cardTextColor};
        width: 3rem;
        height: 3rem;
    }
    @media ${Media.largeEnough}{
        font-size: 4rem;
        svg {
            width: 4rem;
            height: 4rem;
        }
    }
`;
const Status = styled.div`
    font-size: 1.4rem;
    align-self: flex-start;
    font-weight: normal;
`;

const CardButton = ({
    clickHandler, isBig, name, title, shortName, statusLine, IconSvg, cardId, bgColor, ...rest
}) => (
    <Flipped flipId={cardId}>
        <BaseCard
            onClick={(event) => {
                clickHandler({ event, id: cardId });
                event.target.blur();
            }}
            isBig={isBig}
            title={title}
            bgColor={bgColor}
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
    title: PropTypes.string,
    shortName: PropTypes.string,
    statusLine: PropTypes.string,
    IconSvg: PropTypes.func,
    bgColor: PropTypes.string,
};

CardButton.defaultProps = {
    clickHandler: () => {},
    isBig: true,
    name: '',
    title: '',
    shortName: '',
    statusLine: '',
    IconSvg: null,
    bgColor: '',
};

export default CardButton;

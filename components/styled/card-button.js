import styled from 'styled-components';
import PropTypes from 'prop-types';

const BaseCard = styled.div.attrs({
    role: 'button',
    tabIndex: 0,
})`
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
    onClick, isBig, name, shortName, statusLine, IconSvg, ...rest
}) => {
    const clickHandler = (event) => {
        onClick();
        event.target.blur();
    };

    return (
        <BaseCard
            onClick={clickHandler}
            onKeyDown={(e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    clickHandler(e);
                }
            }}
            isBig={isBig}
            {...rest}
        >
            {isBig ? <Name>{name}</Name> : null}
            <Icon>{IconSvg ? <IconSvg /> : <span>{shortName}</span>}</Icon>
            {isBig ? <Status>{statusLine || <span>&nbsp;</span>}</Status> : null }
        </BaseCard>);
};

CardButton.propTypes = {
    onClick: PropTypes.func,
    isBig: PropTypes.bool,
    name: PropTypes.string,
    shortName: PropTypes.string,
    statusLine: PropTypes.string,
};

CardButton.defaultProps = {
    onClick: () => {},
    isBig: true,
    name: '',
    shortName: '',
    statusLine: '',
};

export default CardButton;

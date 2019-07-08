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
    padding: ${({ isBig }) => (isBig ? '2rem 1rem 0.5rem 1rem' : '1rem')};
    color: ${({ theme }) => theme.cardTextColor};
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


const CardButton = ({ onClick, ...rest }) => {
    const clickHandler = (event) => {
        onClick();
        event.target.blur();
    };
    return <BaseCard
        onClick={clickHandler}
        onKeyDown={(e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                clickHandler(e);
            }
        }}
        {...rest}
    />;
};

CardButton.propTypes = {
    onClick: PropTypes.func,
};

CardButton.defaultProps = {
    onClick: () => {},
};

export default CardButton;

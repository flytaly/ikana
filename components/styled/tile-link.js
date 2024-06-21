import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flipped } from 'react-flip-toolkit';
import { useRouter } from 'next/router';
import Media from '../media-queries';

export const BaseTileLink = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: ${({ $isBig }) => ($isBig ? 'space-between' : 'center')};
    align-items: center;
    min-height: ${({ $isBig }) => ($isBig ? '15rem' : '5rem')};
    min-width: ${({ $isBig }) => ($isBig ? '15rem' : '4rem')};
    padding: ${({ $isBig }) => ($isBig ? '1.5rem 1.5rem 1rem 1.5rem' : '1rem')};
    cursor: default;
    color: ${({ theme }) => theme.cardTextColor};
    background-color: ${({ theme, $bgColor }) => $bgColor && theme[$bgColor]};
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0px 0px 5px rgba(0,0,0,0.75);
    box-shadow:  ${({ $isBig }) => ($isBig
        ? '0px 0px 5px 0px rgba(0,0,0,0.75)'
        : '-2px 0px 5px 0px rgba(0,0,0,0.75)')};
    margin: ${({ $isBig }) => ($isBig ? '1rem' : '0 0.5rem 0 0')};
    text-decoration: none;

    :hover,
    :focus {
        box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.50);
        z-index: 20;
    }
    @media ${Media.largeEnough}{
        margin: ${({ $isBig }) => ($isBig ? '1rem' : '0 0 0.5rem 0')};
        min-height: ${({ $isBig }) => ($isBig ? '20rem' : '6rem')};
        min-width: ${({ $isBig }) => ($isBig ? '20rem' : '5rem')};
        padding: ${({ $isBig }) => ($isBig ? '2rem 1.5rem 1rem 1.5rem' : '1rem')};
        font-size: 2.7rem;
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

const TileLink = ({
    isBig=true, name, title, shortName, statusLine, IconSvg, cardId, bgColor, href, ...rest
}) => {
    const router = useRouter();
    return (
        <Flipped flipId={cardId}>
            <BaseTileLink
                onClick={((e) => {
                    e.preventDefault();
                    router.push(href);
                })}
                $isBig={isBig}
                $bgColor={bgColor}
                title={title}
                href={href}
                {...rest}
            >
                {isBig ? <Name>{name}</Name> : null}
                <Flipped inverseFlipId={cardId} scale>
                    <Icon>{IconSvg ? <IconSvg /> : <span>{shortName}</span>}</Icon>
                </Flipped>
                {isBig ? <Status>{statusLine || <span>&nbsp;</span>}</Status> : null}
            </BaseTileLink>
        </Flipped>);
};

TileLink.propTypes = {
    bgColor: PropTypes.string,
    cardId: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    IconSvg: PropTypes.func,
    isBig: PropTypes.bool,
    name: PropTypes.string,
    shortName: PropTypes.string,
    statusLine: PropTypes.string,
    title: PropTypes.string,
};

export default TileLink;

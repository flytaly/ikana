import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flipped } from 'react-flip-toolkit';
import { useRouter } from 'next/router';
import Media from '../media-queries';

export const BaseTileLink = styled.a`
    --page-bg-color: ${({ theme }) => theme.pageBackground};
    --bg-color: ${({ $bgColor, theme }) => theme[$bgColor]};
    --text-color: ${({ theme }) => theme.cardTextColor};
    --shadow-color: color-mix(in lab, var(--bg-color), var(--page-bg-color));

    display: flex;
    flex-direction: column;
    justify-content: ${({ $isBig }) => ($isBig ? 'space-between' : 'center')};
    align-items: center;
    min-height: ${({ $isBig }) => ($isBig ? '15rem' : '5rem')};
    min-width: ${({ $isBig }) => ($isBig ? '15rem' : '4rem')};
    padding: ${({ $isBig }) => ($isBig ? '1.5rem 1.5rem 1rem 1.5rem' : '1rem')};
    cursor: default;
    color: var(--text-color);
    color: color-mix(in lab, var(--text-color) 100%, var(--bg-color) 30%);
    background-color: var(--bg-color);
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
    box-shadow: ${({ $isBig }) =>
        $isBig ? '0px 0px 5px 0px var(--shadow-color)' : '-2px 0px 2px 0px var(--shadow-color)'};
    margin: ${({ $isBig }) => ($isBig ? '1rem' : '0 0.5rem 0 0')};
    text-decoration: none;

    &:hover,
    &:focus {
        z-index: 20;
        color: ${({ theme }) => theme.cardTextColor};
        box-shadow: ${({ $isBig }) =>
            $isBig ? '0px 0px 5px 5px var(--shadow-color)' : '-2px 0px 2px 2px var(--shadow-color)'};
    }

    @media ${Media.largeEnough} {
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
        fill: currentColor;
        width: 3rem;
        height: 3rem;
    }
    @media ${Media.largeEnough} {
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

const TileLink = ({ isBig = true, name, title, shortName, statusLine, IconSvg, cardId, bgColor, href, ...rest }) => {
    const router = useRouter();
    return (
        <Flipped flipId={cardId}>
            <BaseTileLink
                onClick={(e) => {
                    e.preventDefault();
                    router.push(href);
                }}
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
        </Flipped>
    );
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

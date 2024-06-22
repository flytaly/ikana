import React from 'react';
import styled, { css } from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import { Play } from 'react-feather';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { BaseTileLink } from './tile-link';
import Media from '../media-queries';

const StyledStart = styled(BaseTileLink)`
    flex-direction: row;
    justify-content: center;
    ${({ $isBig }) =>
        $isBig
            ? css`
                  min-height: 0;
                  min-width: 0;
              `
            : css`
                  height: 100%;
                  width: 100%;
              `};
    margin: 0;
    padding: 1rem;
    background-color: ${({ theme }) => theme.cardBgColor3};
    > span {
        margin-right: 1rem;
    }
    @media ${Media.largeEnough} {
        /* Yeah, it's a code duplication, but it's important for css specificity
        so parent component won't overwrite it. */
        margin: ${({ $isBig }) => ($isBig ? '1rem' : '0')};
        padding: 1rem;
        ${({ $isBig }) =>
            $isBig
                ? css`
                      min-height: 0;
                      min-width: 0;
                  `
                : css`
                      height: 100%;
                      width: 100%;
                  `};
    }
`;
const StartTile = ({ isBig, href }) => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <Flipped flipId="startButton">
            <StyledStart
                $isBig={isBig}
                title={t('practice.btn_title')}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    router.push(href);
                    // event.target.blur();
                }}
            >
                {isBig ? (
                    <Flipped inverseFlipId="startButton">
                        <span>{t('practice.btn_label')}</span>
                    </Flipped>
                ) : null}
                <Flipped inverseFlipId="startButton" scale>
                    <Play size="1.2em" />
                </Flipped>
            </StyledStart>
        </Flipped>
    );
};

StartTile.propTypes = {
    href: PropTypes.string.isRequired,
    isBig: PropTypes.bool.isRequired,
};

export default StartTile;

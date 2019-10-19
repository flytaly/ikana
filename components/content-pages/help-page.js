import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GitHub, Mail } from 'react-feather';
import { useTranslation, Trans } from 'react-i18next';
import ContentHeader from './content-header';

const InfoBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: flex-start;
    max-width: 96%;
    line-height: normal;
`;

const StyledArticle = styled.article`
    margin-bottom: 1rem;
    h3 {
        margin: 1rem 0 1rem;
        font-size: 1.5rem;
        align-self: flex-start;
    }
`;

const Contacts = styled.div`
    a {
        margin-right: 1.5rem;
    }
    svg {
        margin-right: 0.5rem;
    }
    a,
    svg {
        vertical-align: middle;
        color: inherit;
    }
`;

const About = () => {
    const { t } = useTranslation();
    // eslint-disable-next-line react/prop-types
    const LinkWithA = ({ href, children }) => <Link href={href}><a>{children}</a></Link>;

    return (
        <>
            <ContentHeader>{t('help.pageHeader')}</ContentHeader>
            <InfoBlock>
                <StyledArticle>
                    <h3>{t('help.q1.header')}</h3>
                    <Trans i18nKey="help.q1.body">
                        {`These are Japanese syllabaries, part of Japanese writing system.
                        a character represents one sound in the Japanese language.
                        Check `}
                        <a href={t('help.q1.wikiLink')}>Wikipedia article</a>
                        {' for more information.'}
                    </Trans>
                </StyledArticle>
                <StyledArticle>
                    <h3>{t('help.q2.header')}</h3>
                    <Trans i18nKey="help.q2.body">
                        {'Select rows of kana characters that you want to learn by clicking on corresponding rows in the '}
                        <LinkWithA href="/hiragana">hiragana</LinkWithA>
                        {' and '}
                        <LinkWithA href="/katakana">katakana</LinkWithA>
                        {' tables. Then go to '}
                        <LinkWithA href="/practice">practice</LinkWithA>
                        {' page and choose a practice mode.'}
                    </Trans>
                </StyledArticle>
                <StyledArticle>
                    <h3>{t('help.contacts')}</h3>
                    <Contacts>
                        <a href="mailto:flytaly@gmail.com">
                            <Mail size="1.2em" />
                        flytaly @gmail.com
                        </a>
                        <a href="https://github.com/flytaly/ikana">
                            <GitHub size="1.2em" />
                        GitHub
                        </a>
                    </Contacts>
                </StyledArticle>
            </InfoBlock>
        </>);
};

export default About;

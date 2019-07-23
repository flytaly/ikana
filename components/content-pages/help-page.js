import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GitHub, Mail } from 'react-feather';
import ContentHeader from './content-header';

const InfoBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: flex-start;
    width: 55rem;
    max-width: 100%;
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

const About = () => (
    <>
        <ContentHeader>Help</ContentHeader>
        <InfoBlock>
            <StyledArticle>
                <h3>What are Hiragana and Katakana?</h3>
                <div>
                        They are Japanese syllabaries, part of Japanese writing system.
                        Each kana character represents one sound in the Japanese language.
                        See more information in
                    {' '}
                    <a href="https://en.wikipedia.org/wiki/Kana">Wikipedia article</a>
                    {'.'}
                </div>
            </StyledArticle>
            <StyledArticle>
                <h3>How to use the site?</h3>
                <div>
                    {'Select rows of kana characters that you want to learn by clicking on corresponding rows in the '}
                    <Link href="/hiragana"><a>hiragana</a></Link>
                    {' and '}
                    <Link href="/katakana"><a>katakana</a></Link>
                    {' tables. Then go to '}
                    <Link href="/practice"><a>practice</a></Link>
                    {' page and choose mode.'}
                </div>
            </StyledArticle>
            <StyledArticle>
                <h3>Contacts</h3>
                <Contacts>
                    <a href="mailto:flytaly@gmail.com">
                        <Mail size="1.2em" />
                        flytaly@gmail.com
                    </a>
                    <a href="https://github.com/flytaly/trainkana">
                        <GitHub size="1.2em" />
                        GitHub
                    </a>
                </Contacts>
            </StyledArticle>
        </InfoBlock>
    </>);

export default About;

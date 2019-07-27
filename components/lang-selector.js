
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageBlock = styled.div`
    margin-bottom: 0.5rem;
`;

const StyledSelect = styled.select`
        padding: 0.5rem 4rem 0.5rem 0.5rem;
        font-size: 1.4rem;
        border: none;
        line-height: normal;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: 94% / 2rem  no-repeat #eee ${({ value }) => (value === 'en' ? 'url(/static/en.svg)' : 'url(/static/ru.svg)')};
`;

const createLangCookie = (lang) => {
    const date = new Date();
    date.setTime(date.getTime() + (1000 * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    return `i18next=${lang}${expires}; path=/`;
};

const LangSelector = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language || 'en';
    const changeHandler = ({ target }) => {
        i18n.changeLanguage(target.value);
        document.cookie = createLangCookie(target.value);
    };

    return (
        <LanguageBlock>
            <StyledSelect value={lang} onChange={changeHandler} aria-label="select language" data-testid="langSelector">
                <option value="en">English</option>
                <option value="ru">Русский</option>
            </StyledSelect>
        </LanguageBlock>
    );
};

export default LangSelector;

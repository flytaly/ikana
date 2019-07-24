import Negotiator from 'negotiator';
import cookieParser from 'cookie';

const availableLanguages = ['en', 'ru'];

export const getLangFromCookie = (cookie = '') => {
    const parsed = cookieParser.parse(cookie);
    const { i18next } = parsed;

    if (i18next && availableLanguages.includes(i18next)) {
        return i18next;
    }

    return null;
};

export const getLangFromHeader = (req) => {
    try {
        const negotiator = new Negotiator(req);
        const languages = negotiator.languages(availableLanguages);
        if (languages.length) {
            return languages[0];
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

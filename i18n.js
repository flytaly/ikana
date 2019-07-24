import i18next from 'i18next';
import en from './static/locales/en';
import ru from './static/locales/ru';

export const resources = {
    en: { translation: en },
    ru: { translation: ru },
};

export const makeInit = lng => ({
    resources,
    lng,
    fallbackLng: 'en',

    // debug: process.env.NODE_ENV === 'development',

    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export { i18next };

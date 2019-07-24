import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './static/locales/en';
import ru from './static/locales/ru';

export const resources = {
    en: { translation: en },
    ru: { translation: ru },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        // lng: 'en',
        fallbackLng: 'en',

        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

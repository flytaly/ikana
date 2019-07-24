/* eslint-disable consistent-return */
import Negotiator from 'negotiator';

const availableLanguages = ['en', 'ru'];

export default (req) => {
    if (!process.browser) {
        try {
            const negotiator = new Negotiator(req);
            const languages = negotiator.languages(availableLanguages);
            if (languages.length) {
                return languages[0];
            }
        } catch (e) {
            console.error(e);
        }
        return 'en';
    }
};

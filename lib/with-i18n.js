import React from 'react';
import { getLangFromHeader, getLangFromCookie } from './get-language';
import { i18next, makeInit } from '../i18n';

const withI18n = (App) =>
    class WithI18n extends React.Component {
        static displayName = 'withI18n(App)';

        static async getInitialProps(ctx) {
            const {
                ctx: { req },
            } = ctx;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx);
            }

            let lang = 'en';
            if (typeof window === 'undefined') {
                const cookieLang = getLangFromCookie(req.headers.cookie);
                const acceptLang = getLangFromHeader(req);

                lang = cookieLang || acceptLang || 'en';
                ctx.lang = lang;
            }

            return {
                ...appProps,
                lang,
            };
        }

        constructor(props) {
            super(props);
            const { lang } = this.props;
            this.i18n = i18next.createInstance(
                makeInit(lang),
                (e) => e && console.error('Error during creating i18next instance', e),
            );
        }

        render() {
            return <App {...this.props} i18n={this.i18n} />;
        }
    };

export default withI18n;

/* eslint-disable react/prop-types */
import React from 'react';
import getLanguage from './get-language';
import { i18next, makeInit } from '../i18n';

export default App => class withI18n extends React.Component {
    static displayName = 'withI18n(App)'

    static async getInitialProps(ctx) {
        const { ctx: { req } } = ctx;

        let appProps = {};
        if (App.getInitialProps) {
            appProps = await App.getInitialProps(ctx);
        }

        const lang = getLanguage(req);
        ctx.lang = lang;

        return {
            ...appProps,
            lang,
        };
    }

    constructor(props) {
        super(props);
        const { lang } = this.props;
        this.i18n = i18next.createInstance(makeInit(lang), e => e && console.log('Error during creating i18next instance', e));
    }

    render() {
        return <App {...this.props} i18n={this.i18n} />;
    }
};

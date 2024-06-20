import React from 'react';
import App from 'next/app';
import { Flipper } from 'react-flip-toolkit';
import Router from 'next/router';
import { I18nextProvider } from 'react-i18next';
import Page from '../components/page';
import { StateProvider } from '../components/state';
import withI18n from '../lib/with-i18n';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render() {
        const { Component, pageProps, i18n } = this.props;
        const route = typeof window !== 'undefined'? Router.route : null;

        return (
            <I18nextProvider i18n={i18n}>
                <StateProvider>
                    <Page>
                        {/* Trigger Flipper only if route changes to/from root */}
                        <Flipper flipKey={route === '/'}>
                            <Component {...pageProps} />
                        </Flipper>
                    </Page>
                </StateProvider>
            </I18nextProvider>
        );
    }
}

export default withI18n(MyApp);

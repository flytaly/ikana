import React from 'react';
import App, { Container } from 'next/app';
import { Flipper } from 'react-flip-toolkit';
import Router from 'next/router';
import { I18nextProvider } from 'react-i18next';
import Page from '../components/page';
import { StateProvider } from '../components/state';
import withI18n from '../lib/with-i18n';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        pageProps.query = ctx.query;

        return { pageProps };
    }

    render() {
        const { Component, pageProps, i18n } = this.props;
        const route = process.browser ? Router.route : null;

        return (
            <Container>
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
            </Container>
        );
    }
}

export default withI18n(MyApp);

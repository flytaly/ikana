import React from 'react';
import App, { Container } from 'next/app';
import { Flipper } from 'react-flip-toolkit';
import Router from 'next/router';
import Page from '../components/page';
import { StateProvider } from '../components/state';

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
        const { Component, pageProps } = this.props;
        const route = process.browser ? Router.route : null;
        return (
            <Container>
                <StateProvider>
                    <Page>
                        {/* Trigger Flipper only if route change to/from root */}
                        <Flipper flipKey={route === '/'}>
                            <Component {...pageProps} />
                        </Flipper>
                    </Page>
                </StateProvider>
            </Container>
        );
    }
}

export default MyApp;

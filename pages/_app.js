import React from 'react';
import App, { Container } from 'next/app';
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

        return (
            <Container>
                <StateProvider>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </StateProvider>
            </Container>
        );
    }
}

export default MyApp;

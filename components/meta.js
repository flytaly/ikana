import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Meta = () => {
    const { t } = useTranslation();
    return (
        <Head>
            {/* <link href="https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Sans+JP&display=swap" rel="stylesheet" /> */}
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=cyrillic" rel="stylesheet" />
            <link rel="preload" href="/static/fonts/noto-sans-jp-regular-kana-only.woff2" as="font" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{t('meta.title')}</title>
            <meta name="description" content={t('meta.description')} />

            <link rel="apple-touch-icon" sizes="57x57" href="/static/meta/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/static/meta/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/static/meta/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/static/meta/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/static/meta/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/static/meta/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/static/meta/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/static/meta/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/meta/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/static/meta/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/meta/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/static/meta/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/meta/favicon-16x16.png" />
            <link rel="manifest" href="/static/meta/manifest.json" />
            <meta name="msapplication-TileColor" content="#f0f0f0" />
            <meta name="msapplication-TileImage" content="/static/meta/ms-icon-144x144.png" />
            <meta name="theme-color" content="#f0f0f0" />

        </Head>);
};

export default Meta;

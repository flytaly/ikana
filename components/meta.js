import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Meta = () => {
    const { t } = useTranslation();
    return (
        <Head>
            {/* <link href="https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Sans+JP&display=swap" rel="stylesheet" /> */}
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=cyrillic" rel="stylesheet" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{t('meta.title')}</title>
            <meta name="description" content={t('meta.description')} />
        </Head>);
};

export default Meta;

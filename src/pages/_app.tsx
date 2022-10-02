import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Head from 'next/head';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Hacktoberfest Issues</title>
        <meta name="description" content="Find the latest open issues for hacktoberfest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;

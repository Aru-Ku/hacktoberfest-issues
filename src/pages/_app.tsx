import type { AppProps } from 'next/app';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import AppContext from '../contexts/AppContext';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      <Fragment>
        <Head>
          <title>Hacktoberfest Issues</title>
          <meta name="description" content="Find the latest open issues for hacktoberfest" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Fragment>
    </AppContext.Provider>
  );
}

export default MyApp;

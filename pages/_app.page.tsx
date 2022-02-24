import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { BaseAppProvider } from 'baseapp-nextjs-core'
import Header from '../components/Header'

import createEmotionCache from 'styles/createEmotionCache';
import theme from 'styles/theme';
/* This will fix some issues with 100vh for mobile devices 
https://github.com/mvasin/react-div-100vh 
*/
import Div100vh from 'react-div-100vh'; 

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (<BaseAppProvider pageProps={pageProps}>
    <SnackbarProvider maxSnack={3}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>BaseApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Div100vh>
            <Header />

            <main>
              <Component {...pageProps} />
            </main>

            <footer>
              <p>Made with &#10084; by <a href="https://tsl.io">The SilverLogic</a></p>
            </footer>
          </Div100vh>
        </ThemeProvider>
      </CacheProvider>
    </SnackbarProvider>
  </BaseAppProvider>);
};

export default App;

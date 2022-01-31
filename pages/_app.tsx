import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';
import { SnackbarProvider } from 'notistack';
/* This will fix some issues with 100vh for mobile devices 
https://github.com/mvasin/react-div-100vh 

Use it like this:
import { use100vh } from 'react-div-100vh'

const MyComponent = ({ children }) => {
  const height = use100vh()
  return <div style={{ height: height }}>{children}</div>
}
*/
import Div100vh from 'react-div-100vh'; 

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Div100vh>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </Div100vh>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;

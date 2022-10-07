import { ReactNode } from 'react'
import Head from 'next/head'
import type { AppProps as MuiAppProps } from 'next/app'
import type { NextComponentType, NextPageContext } from 'next'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import { BaseAppProvider } from '@baseapp-frontend/core'

import createEmotionCache from 'styles/createEmotionCache'
import DefaultLayout from 'layouts/DefaultLayout'
import theme from 'styles/theme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type NextComponentTypeWithLayout<P = Record<string, unknown>> =
  NextComponentType<NextPageContext, any, P> & {
    getLayout?(page: ReactNode): ReactNode
  }

interface AppProps extends MuiAppProps {
  Component: NextComponentTypeWithLayout
  emotionCache?: EmotionCache
}

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || DefaultLayout

  return (
    <BaseAppProvider pageProps={pageProps}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>BaseApp</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseAppProvider>
  )
}

export default App

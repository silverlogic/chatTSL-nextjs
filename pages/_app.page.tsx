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

import 'public/fonts/fonts.css'
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically since it's already imported above
faConfig.autoAddCss = false;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type NextComponentTypeWithLayout<P = Record<string, unknown>> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
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
            <title>TSL BaseApp</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no"
            />
            <link rel="icon" href="/favicon.ico" />
            <meta name="robots" content="max-image-preview:large" />
            {/* <!-- TODO: Replace "content" with your own --> */}
            {/* <!-- MS, fb & Whatsapp --> */}

            {/* <!-- MS Tile - for Microsoft apps--> */}
            <meta
              name="msapplication-TileImage"
              content="https://mar-api-production.s3.amazonaws.com/media/skills/7266c5a1-1aaa-4939-a17e-66a0c6fb2358.png"
            />

            {/* <!-- fb & Whatsapp --> */}

            {/* <!-- Site Name, Title, and Description to be displayed --> */}
            <meta property="og:site_name" content="TSL BaseApp" />
            <meta property="og:title" content="TSL BaseApp" />
            <meta property="og:description" content="A NextJS baseapp for TSL projects" />

            {/* <!-- Image to display --> */}
            <meta
              property="og:image"
              content="https://mar-api-production.s3.amazonaws.com/media/skills/7266c5a1-1aaa-4939-a17e-66a0c6fb2358.png"
            />

            {/* <!-- No need to change anything here --> */}
            <meta property="og:type" content="website" />
            <meta property="og:image:type" content="image/png" />

            {/* <!-- Size of image. Any size up to 300. Anything above 300 will not work in WhatsApp --> */}
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />

            {/* <!-- Website to visit when clicked in fb or WhatsApp--> */}
            <meta property="og:url" content="https://tsl.io/"></meta>
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

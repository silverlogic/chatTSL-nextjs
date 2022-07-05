import { ReactNode } from 'react'
import Head from 'next/head'

import Header from 'components/Header'

/* This will fix some issues with 100vh for mobile devices 
https://github.com/mvasin/react-div-100vh 
*/
import Div100vh from 'react-div-100vh'

function DefaultLayout(page: ReactNode): ReactNode {
  return (
    <>
      <Head>
        <title>BaseApp</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Div100vh>
        <Header />

        <main>{page}</main>

        <footer>
          <p>
            Made with &#10084; by <a href="https://tsl.io">The SilverLogic</a>
          </p>
        </footer>
      </Div100vh>
    </>
  )
}

export default DefaultLayout

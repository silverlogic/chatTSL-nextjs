import { ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'

/* This will fix some issues with 100vh for mobile devices 
https://github.com/mvasin/react-div-100vh 
*/
import Div100vh from 'react-div-100vh'

function DefaultLayout(page: ReactNode): ReactNode {
  return (
    <>
      <Head>
        <title>The SilverLogic | Custom Software Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Div100vh>
        <Box>{page}</Box>
      </Div100vh>
    </>
  )
}

export default DefaultLayout

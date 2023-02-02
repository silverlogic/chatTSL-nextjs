import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
      <Head>
        <title>BaseApp - Home</title>
      </Head>
      <h1>
        Welcome to <a href="https://baseapp.tsl.io">BaseApp!</a>
      </h1>
    </div>
  )
}

export default Home

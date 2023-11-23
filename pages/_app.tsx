import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps): (React.ReactElement | null) {
  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </>
  )
}
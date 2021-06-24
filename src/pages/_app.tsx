import type { AppProps } from 'next/app'

import { AuthContextProvider }  from '../contexts/AuthContext'

import { ThemeProvider } from 'next-themes'

import Head from 'next/head'
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthContextProvider>
    )
}
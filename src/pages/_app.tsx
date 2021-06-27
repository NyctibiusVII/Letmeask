import type { AppProps } from 'next/app'

import { AuthContextProvider }    from '../contexts/AuthContext'
import { CloseRoomProvider }      from '../contexts/CloseRoomContext'
import { DeleteQuestionProvider } from '../contexts/DeleteQuestionContext'
import { ModalProvider }          from '../contexts/ModalContext'
import { ToastProvider }          from 'react-toast-notifications'

import { ThemeProvider } from 'next-themes'

import Head from 'next/head'
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <CloseRoomProvider>
                <DeleteQuestionProvider>
                    <ModalProvider>
                        <ToastProvider
                            autoDismiss
                            autoDismissTimeout={3500}
                            placement='top-center'
                            transitionDuration={300}
                        >
                            <Head>
                                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                            </Head>
                            <ThemeProvider>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </ToastProvider>
                    </ModalProvider>
                </DeleteQuestionProvider>
            </CloseRoomProvider>
        </AuthContextProvider>
    )
}
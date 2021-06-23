import { auth, firebase } from '../services/firebase'
import { useAuth }        from '../hooks/useAuth'

import { AsideIllustration } from '../components/asideIllustration'
import { RoomButton }        from '../components/roomButton'

import Router from 'next/router'

import logo       from '../../public/icons/logo.svg'
import googleIcon from '../../public/icons/google-icon.svg'
import loggedIn   from '../../public/icons/log-in.svg'

import Head   from 'next/head'
import Image  from 'next/image'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
    const { user, signInWithGoogle } = useAuth()

    const handleCreateRoom = async() => {
        if(!user) await signInWithGoogle()

        Router.push('/createRoom')
    }

    const
        imgSizeGiga      = 520,
        imgSizeLarge     = 120,
        imgSizeMedium    = 80,
        imgSizeSmall     = 40,
        imgSizelittle    = 20,
        imgSizeMini      = 16

    return (
        <div className={styles.container}>
            <Head>
                <title>Início | Letmeask</title>
            </Head>

            <AsideIllustration />

            <main>
                <div className={styles.mainContent}>
                    <Image
                        src={logo}
                        alt="Logo Letmeask"
                        height={imgSizeMedium}
                        width={imgSizeMedium}
                    />
                    <button className={styles.createRoom} onClick={handleCreateRoom}>
                        <Image
                            src={googleIcon}
                            alt="Google icon"
                            height={imgSizeMini}
                            width={imgSizeMini}
                        />
                        Crie sua sala com o Google
                    </button>

                    <small className={styles.separator}>ou entre em uma sala</small>

                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            required
                        />
                        <RoomButton type="submit">
                            <Image
                                src={loggedIn}
                                alt="Logged in"
                                height={imgSizelittle}
                                width={imgSizelittle}
                            />
                            Entrar na sala
                        </RoomButton>
                    </form>
                </div>
            </main>
        </div>
    )
}

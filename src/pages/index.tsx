import { AsideIllustration } from '../components/asideIllustration'
import { RoomButton }        from '../components/roomButton'
import { GoogleButton }      from '../components/googleButton'

import {
    FormEvent,
    useState
} from 'react'
import { database } from '../services/firebase'
import { useTheme } from 'next-themes'

import logoL    from '../../public/icons/logo/light.svg'
import logoD    from '../../public/icons/logo/dark.svg'
import loggedIn from '../../public/icons/log-in.svg'

import Head   from 'next/head'
import Router from 'next/router'
import Image  from 'next/image'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
    const { theme } = useTheme()
    const [ roomCode, setRoomCode ] = useState('')

    const handleJoinRoom = async(event: FormEvent) => {
        event.preventDefault()

        if (roomCode.trim() === '') return

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            alert('Sala não existe')
            return
        }

        if (roomRef.val().closedAt) {
            alert('Esta sala ja foi encerrada!')
            return
        }

        Router.push(`/rooms/${roomCode}`)
    }

    const
        imgSizeGiga   = 520,
        imgSizeLarge  = 120,
        imgSizeMedium = 80,
        imgSizeSmall  = 40,
        imgSizeShort  = 32,
        imgSizelittle = 20,
        imgSizeMini   = 16

    return (
        <div className={styles.container}>
            <Head>
                <title>Início | Letmeask</title>
            </Head>

            <AsideIllustration />

            <main>
                <div className={styles.mainContent}>
                    <Image
                        src={theme === 'light' ? logoL : logoD}
                        alt="Logo Letmeask"
                        height={imgSizeMedium}
                        width={imgSizeMedium}
                    />
                    <GoogleButton context='home' text="Crie sua sala com o Google" icon={true} />

                    <small className={styles.separator}>ou entre em uma sala</small>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
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

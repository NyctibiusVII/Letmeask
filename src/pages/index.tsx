import { AsideIllustration } from '../components/asideIllustration'
import { Loading }           from '../components/Loading'
import { RoomButton }        from '../components/roomButton'
import { GoogleButton }      from '../components/googleButton'
import { GithubButton }      from '../components/GithubButton'

import {
    FormEvent,
    useState
} from 'react'
import { useToasts } from 'react-toast-notifications'
import { useTheme }  from 'next-themes'
import { database }  from '../services/firebase'
import { useAuth }   from '../hooks/useAuth'

import logoL    from '../../public/icons/logo/light.svg'
import logoD    from '../../public/icons/logo/dark.svg'
import loggedIn from '../../public/icons/log-in.svg'

import Head   from 'next/head'
import Router from 'next/router'
import Image  from 'next/image'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
    const { user }  = useAuth()
    const { theme } = useTheme()
    const { addToast } = useToasts()
    const [ roomCode, setRoomCode ] = useState('')

    const handleJoinRoom = async(event: FormEvent) => {
        event.preventDefault()

        if (roomCode.trim() === '') return

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            addToast('Sala não encontrada! Verifique se o código está correto.', {
                appearance: 'error',
                autoDismissTimeout: 5000
            })
            return
        }

        if (roomRef.val().closedAt) {
            addToast('Esta sala ja foi encerrada!', {
                appearance: 'error',
                autoDismissTimeout: 5000
            })
            return
        }

        const  entering = async() => {
            addToast(`Entrando na sala: ${roomRef.val().title}`, {
                appearance: 'info'
            })

            await Router.push(`/rooms/${roomCode}`)
        }
        entering()
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

                    { user !== undefined ? (
                        <>
                            { user ? (
                                <RoomButton onClick={() => Router.push('/room/new')} createRoom>
                                    Criar uma sala
                                </RoomButton>
                            ) : (
                                <>
                                    <GoogleButton context='home' text="Crie sua sala com o Google" icon={true} />
                                    <GithubButton context='home' text="Crie sua sala com o Github" icon={true} />
                                </>
                            ) }
                        </>
                    ) : <Loading width='20%' height='20%' percent /> }

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

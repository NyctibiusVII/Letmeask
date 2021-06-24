import { AsideIllustration } from '../../components/asideIllustration'
import { RoomButton }        from '../../components/roomButton'

import {
    FormEvent,
    useState
} from 'react'
import { database } from '../../services/firebase'
import { useAuth }  from '../../hooks/useAuth'

import logo from '../../../public/icons/logo.svg'

import Head   from 'next/head'
import Link   from 'next/link'
import Router from 'next/router'
import Image  from 'next/image'
import styles from '../../styles/pages/NewRoom.module.scss'

export default function NewRoom() {
    const { user } = useAuth()
    const [ newRoom, setNewRoom ] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') return

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        Router.push(`rooms/${firebaseRoom.key}`) // - Add 'admin/rooms/...' to Production
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
                <title>New room | Letmeask</title>
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

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                            required
                        />
                        <RoomButton type="submit">
                            Criar sala
                        </RoomButton>
                    </form>

                    <small>Quer entrar em uma sala existente?&nbsp;
                        <Link href='/'>Clique aqui</Link>
                    </small>
                </div>
            </main>
        </div>
    )
}
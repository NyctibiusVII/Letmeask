import { AsideIllustration } from '../../components/asideIllustration'
import { RoomButton }        from '../../components/roomButton'

import {
    FormEvent,
    useState
} from 'react'
import { database }  from '../../services/firebase'
import { useAuth }   from '../../hooks/useAuth'
import { useTheme }  from 'next-themes'
import { useToasts } from 'react-toast-notifications'

import logoL from '../../../public/icons/logo/light.svg'
import logoD from '../../../public/icons/logo/dark.svg'

import Head   from 'next/head'
import Link   from 'next/link'
import Router from 'next/router'
import Image  from 'next/image'
import styles from '../../styles/pages/NewRoom.module.scss'

export default function NewRoom() {
    const { user } = useAuth()
    const { theme } = useTheme()
    const { addToast } = useToasts()
    const [ newRoom, setNewRoom ] = useState('')
    const maxCharacters = 15

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') return

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        const  entering = async() => {
            addToast('Sala criada com sucesso 🎫', {
                appearance: 'success'
            })

            await Router.push(`/admin/rooms/${firebaseRoom.key}`)
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
                <title>Nova sala | Letmeask</title>
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

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                            maxLength={maxCharacters}
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
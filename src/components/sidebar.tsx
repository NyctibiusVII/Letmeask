import { RoomCode }   from './roomCode'
import { RoomButton } from './roomButton'

import { database } from '../services/firebase'

import logo from '../../public/icons/logo.svg'

import Router, { useRouter } from 'next/router'
import Image  from 'next/image'
import styles from '../styles/components/Sidebar.module.scss'

export function Sidebar() {
    const { id: roomId } = useRouter().query

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })

        Router.push('/')
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
        <header className={styles.container}>
            <div className={styles.content}>
                <Image
                    src={logo}
                    alt="Logo Letmeask"
                    height={imgSizeMedium}
                    width={imgSizeMedium}
                />
                <div>
                    { (roomId !== undefined && !Array.isArray(roomId)) && (
                        <RoomCode code={roomId} />
                    ) }
                    {
                        // - Verificar se é admin para add a RoomButton
                    }
                    <RoomButton isOutlined onClick={handleEndRoom}>Encerrar sala</RoomButton>
                </div>
            </div>
        </header>
    )
}
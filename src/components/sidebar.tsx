import { RoomCode }     from './roomCode'
import { RoomButton }   from './roomButton'
import { ThemeChanger } from './themeChanger'

import { useTheme } from 'next-themes'

import { database } from '../services/firebase'

import logoL from '../../public/icons/logo/light.svg'
import logoD from '../../public/icons/logo/dark.svg'

import Router, { useRouter } from 'next/router'
import Image  from 'next/image'
import styles from '../styles/components/Sidebar.module.scss'

export function Sidebar() {
    const { id: roomId } = useRouter().query
    const { theme } = useTheme()

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
                    src={theme === 'light' ? logoL : logoD}
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

                    <ThemeChanger />
                </div>
            </div>
        </header>
    )
}
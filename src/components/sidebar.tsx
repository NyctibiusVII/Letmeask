import { RoomCode } from './roomCode'

import logo from '../../public/icons/logo.svg'

import { useRouter } from 'next/router'

import Image  from 'next/image'
import styles from '../styles/components/Sidebar.module.scss'

export function Sidebar() {
    const { id: roomId } = useRouter().query

    const
        imgSizeGiga      = 520,
        imgSizeLarge     = 120,
        imgSizeMedium    = 80,
        imgSizeSmall     = 40,
        imgSizelittle    = 20,
        imgSizeMini      = 16

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Image
                    src={logo}
                    alt="Logo Letmeask"
                    height={imgSizeMedium}
                    width={imgSizeMedium}
                />
                { (roomId !== undefined && !Array.isArray(roomId)) && (
                    <RoomCode code={roomId} />
                ) }
            </div>
        </header>
    )
}
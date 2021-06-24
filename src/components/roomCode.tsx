import { RoomCodeProps } from '../interfaces/roomTypes'

import copy from '../../public/icons/copy.svg'

import Image  from 'next/image'
import styles from '../styles/components/RoomCode.module.scss'

export function RoomCode(props: RoomCodeProps) {
    const roomId = props.code

    const copyRoomCodeToClipboard = () => {
        navigator.clipboard.writeText(roomId)
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
        <button className={styles.container} onClick={copyRoomCodeToClipboard}>
            <div>
                <Image
                    src={copy}
                    alt="Copiar codigo da sala"
                    height={imgSizelittle}
                    width={imgSizelittle}
                />
            </div>
            <span>Sala #{roomId}</span>
        </button>
    )
}
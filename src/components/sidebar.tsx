import { RoomCode }     from './roomCode'
import { ThemeChanger } from './themeChanger'

import { ReactNode } from 'react'
import { useTheme }  from 'next-themes'

import logoL from '../../public/icons/logo/light.svg'
import logoD from '../../public/icons/logo/dark.svg'

import Link   from 'next/link'
import { useRouter } from 'next/router'
import Image  from 'next/image'
import styles from '../styles/components/Sidebar.module.scss'

type SidebarProps = {
    children?: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
    const { id: roomId } = useRouter().query
    const { theme } = useTheme()

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
                <Link href='/' passHref>
                    <>
                        <Image
                            title="Voltar para a página home"
                            src={theme === 'light' ? logoL : logoD}
                            alt="Logo Letmeask"
                            height={imgSizeMedium / 2}
                            width={imgSizeLarge}
                            layout="fixed"
                        />
                    </>
                </Link>
                <div>
                    { (roomId !== undefined && !Array.isArray(roomId)) && (
                        <RoomCode code={roomId} />
                    ) }
                    {children}
                    <ThemeChanger />
                </div>
            </div>
        </header>
    )
}
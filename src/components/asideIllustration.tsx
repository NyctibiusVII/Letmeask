import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import illustrationL from '../../public/icons/illustration/light.svg'
import illustrationD from '../../public/icons/illustration/dark.svg'

import Image  from 'next/image'
import styles from '../styles/components/AsideIllustration.module.scss'

export function AsideIllustration() {
    const [ mounted, setMounted ] = useState(false)
    const { theme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const
        imgSizeGiga   = 520,
        imgSizeLarge  = 120,
        imgSizeMedium = 80,
        imgSizeSmall  = 40,
        imgSizeShort  = 32,
        imgSizelittle = 20,
        imgSizeMini   = 16

    return (
        <aside className={styles.container}>
            <Image
                src={theme === 'light' ? illustrationL : illustrationD}
                alt="Ilustração de mensagens"
                height={imgSizeGiga}
                width={imgSizeGiga}
                decoding="async"
                quality={100}
                priority
            />
            <h1>Crie salas de Q&amp;A ao-vivo</h1>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
        </aside>
    )
}
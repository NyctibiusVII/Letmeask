import { useAuth }  from '../hooks/useAuth'
import { useTheme } from 'next-themes'

import { GoogleButtonProps } from '../interfaces/loginButtonType'

import googleL  from '../../public/icons/google/light.svg'
import googleD  from '../../public/icons/google/dark.svg'

import Router from 'next/router'
import Image  from 'next/image'
import styles from '../styles/components/GoogleButton.module.scss'

export function GoogleButton({ context, text, icon = false }: GoogleButtonProps) {
    const { user, signInWithGoogle } = useAuth()
    const { theme } = useTheme()

    const handleCreateRoom = (context: 'home' | 'other') => {

        const signInAndRedirect = async () => {
            if(!user) await signInWithGoogle()

            Router.push('/room/new')
        }
        const signIn = async () => {
            if(!user) await signInWithGoogle()
        }

        context === 'home' ? signInAndRedirect() : signIn()
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
        <button className={styles.createRoom} onClick={() => handleCreateRoom(context)}>
            { icon && (
                <Image
                    src={theme === 'light' ? googleL : googleD}
                    alt="Google icon"
                    height={imgSizeMini}
                    width={imgSizeMini}
                />
            ) }
            {text}
        </button>
    )
}
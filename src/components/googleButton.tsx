import { useAuth }   from '../hooks/useAuth'
import { useTheme }  from 'next-themes'
import { useToasts } from 'react-toast-notifications'

import { GoogleButtonProps } from '../interfaces/loginButtonType'

import googleL  from '../../public/icons/google/light.svg'
import googleD  from '../../public/icons/google/dark.svg'

import Router from 'next/router'
import Image  from 'next/image'
import styles from '../styles/components/GoogleButton.module.scss'

export function GoogleButton({ context, text, icon = false }: GoogleButtonProps) {
    const { user, signInWithGoogle } = useAuth()
    const { theme } = useTheme()
    const { addToast } = useToasts()

    const successToast = () => {
        addToast(`Bem-vindo ao Letmeask 🎉`, { // FIX: Bem-vindo ao Letmeask undefined🎉 > `${user?.name}`
            appearance: 'success',
            autoDismissTimeout: 4000
        })

    }
    const warnToast = (err: string) => {
        let message = null

        switch(err) {
            case 'auth/popup-closed-by-user':
                message='| O pop-up foi fechado antes de finalizar a operação.'
                break
            case 'auth/account-exists-with-different-credential':
                message='| Já existe uma conta com o mesmo endereço de e-mail, mas com credenciais de login diferentes. Faça login usando o provedor associado a este endereço de e-mail.'
                break
        }

        addToast(`Não logado! 😕 ${message ?? ''}`, {
            appearance: 'warning',
            autoDismissTimeout: 5000
        })
    }

    const handleCreateRoom = (context: 'home' | 'other') => {

        const signInAndRedirect = async () => {
            if(!user)
                await signInWithGoogle()
                    .then(() => {
                        successToast()
                        Router.push('/room/new')
                    })
                    .catch(err => warnToast(err.code))
            else Router.push('/room/new')
        }
        const signIn = async () => {
            if(!user)
                await signInWithGoogle()
                    .then(() => successToast())
                    .catch(err => warnToast(err.code))
            else Router.push('/room/new')
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
        <button className={styles.container} onClick={() => handleCreateRoom(context)}>
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
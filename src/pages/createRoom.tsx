import '../services/firebase'

import { AsideIllustration } from '../components/asideIllustration'
import { RoomButton }        from '../components/roomButton'

import logo from '../../public/icons/logo.svg'

import Head   from 'next/head'
import Link   from 'next/Link'
import Image  from 'next/image'
import styles from '../styles/pages/CreateRoom.module.scss'

export default function CreateRoom() {
    const
        imgSizeGiga      = 520,
        imgSizeLarge     = 120,
        imgSizeMedium    = 80,
        imgSizeSmall     = 40,
        imgSizelittle    = 20,
        imgSizeMini      = 16

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

                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
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
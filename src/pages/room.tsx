import Head   from 'next/head'
import styles from '../styles/pages/RoomQA.module.scss'

export default function RoomQA() {
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
                <title>Room Q&amp;A | Letmeask</title>
            </Head>

            Escolha sua sala:
             a
             b
             c
        </div>
    )
}
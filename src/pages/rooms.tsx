import Head   from 'next/head'
import styles from '../styles/pages/RoomsQA.module.scss'

export default function RoomsQA() {
    const
        imgSizeGiga   = 520,
        imgSizeLarge  = 120,
        imgSizeMedium = 80,
        imgSizeSmall  = 40,
        imgSizeShort  = 32,
        imgSizelittle = 20,
        imgSizeMini   = 16

    return (
        <div className={styles.container}>
            <Head>
                <title>Rooms Q&amp;A | Letmeask</title>
            </Head>

            Escolha sua sala:
             a
             b
             c
        </div>
    )
}
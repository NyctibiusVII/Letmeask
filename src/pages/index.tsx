import '../services/firebase'

import Head   from 'next/head'
import Image  from 'next/image'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Home</title>
                </Head>

                <h1>Hello World</h1>
            </div>
        </>
    )
}

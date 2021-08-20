import { Fragment, ReactNode } from 'react'
import { useTheme }  from 'next-themes'

import _404errL from '../../public/icons/_404/light.svg'
import _404errD from '../../public/icons/_404/dark.svg'

import Link   from 'next/link'
import Image  from 'next/image'
import styles from '../styles/pages/_404.module.scss'

type NotFoundType = {
    //children: ReactNode
    children: (arg0: number) => any
    numTimes: number
}

export default function _404() {
    const { theme } = useTheme()

    const count = 50
    const errorName = '404 Página Não Encontrada'

    const NotFound = (props: NotFoundType) => {
        let items: ReactNode[] = []

        for (let i = 0; i < props.numTimes; i++) {
            items.push(props.children(i))
        }
        return <>{items}</>
    }
    const Comment = () =>
        <h2>
            <pre>
                {`/**\n *  Desculpe, a página que você\n *  estava buscando não foi\n *  encontrada.\n */ `}
            </pre>
        </h2>

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
            {/* <div className={styles.contentBlock}>
                <h1>Desculpe, a página que você estava buscando não foi encontrada.</h1>
            </div> */}

            <div className={styles.contentGlitchErrorName}>
                <b>
                    <p>{errorName}</p>
                    <NotFound numTimes={count}>
                        { (index: number) => <span key={index}>{errorName}<br/></span> }
                    </NotFound>
                </b>
                <div className={styles.contentBlock} />
                <div className={styles.contentBlock} />
                <div className={styles.contentBlock} />
            </div>

            <aside className={styles.backHome}>
                <Link href='/'>
                    <a>&nbsp;Ir para Home&nbsp;</a>
                </Link>
                <div className={styles.triangle} />
            </aside>

            <main className={styles.contentError404}>
                <div className={styles.navMacOS}>
                    <div /><div /><div />
                </div>
                <Image
                    src={theme === 'light' ? _404errL : _404errD}
                    alt="404"
                    height={imgSizeGiga - (imgSizeLarge * 2)}
                    width={imgSizeGiga}
                />
                <h1>Página Não Encontrada</h1>
                <div className={`${styles.commentIn} ${styles.comment}`}>
                    <Comment />
                </div>
            </main>

            <div className={`${styles.commentEx} ${styles.comment}`}>
                <Comment />
            </div>
        </div>
    )
}
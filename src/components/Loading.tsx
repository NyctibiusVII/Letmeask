import ReactLoading from 'react-loading'

import { LoadingProps } from '../interfaces/loadType'

import styles from '../styles/components/Loading.module.scss'

export function Loading({ color='#835afd', width='10%', height='10%', percent=false }: LoadingProps) {
    return (
        <div className={`${styles.container} ${percent ? styles.percent : ''}`}>
            <ReactLoading type='bubbles' color={color} width={width} height={height} />
        </div>
    )
}
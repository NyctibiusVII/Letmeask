import { ButtonHTMLAttributes } from 'react'

import styles from '../styles/components/RoomButton.module.scss'

type RoomButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const RoomButton = (roomButtonProps: RoomButtonProps) => <button className={styles.container} {...roomButtonProps} />
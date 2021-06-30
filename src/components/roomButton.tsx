import { RoomButtonProps } from '../interfaces/roomTypes'

import styles from '../styles/components/RoomButton.module.scss'

export const RoomButton = ({ isOutlined = false, createRoom = false, ...props }: RoomButtonProps) =>
    <button className={`${styles.container} ${isOutlined ? styles.outlined : ''} ${createRoom ? styles.createRoom : ''}`} {...props} />
import { ButtonHTMLAttributes } from 'react'

export type RoomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
    createRoom?: boolean
}

export type RoomCodeProps = {
    code: string
}

export type RoomExistsType = {
    room: boolean
    loaded: boolean
}
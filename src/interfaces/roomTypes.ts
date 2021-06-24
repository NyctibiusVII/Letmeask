import { ButtonHTMLAttributes } from 'react'

export type RoomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export type RoomCodeProps = {
    code: string
}
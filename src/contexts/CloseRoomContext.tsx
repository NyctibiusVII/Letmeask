import {
    createContext,
    ReactNode
} from 'react'
import { database }          from '../services/firebase'
import Router, { useRouter } from 'next/router'

interface CloseRoomContextData {
    handleEndRoom: () => void
}
interface CloseRoomProviderProps {
    children: ReactNode
}

export const CloseRoomContext = createContext({} as CloseRoomContextData)

export function CloseRoomProvider({ children }: CloseRoomProviderProps) {
    const { id: roomId } = useRouter().query

    async function handleEndRoom() {
        await
            database
                .ref(`rooms/${roomId}`)
                .update({
                    closedAt: new Date()
                })
                .then(() => Router.push('/'))
    }

    return (
        <CloseRoomContext.Provider
            value={{
                handleEndRoom
            }}
        >
            { children }
        </CloseRoomContext.Provider>
    )
}
import { useEffect, useState } from 'react'
import { database }            from '../services/firebase'
import { useAuth }             from './useAuth'

import { RoomExistsType }               from '../interfaces/roomTypes'
import { FirebaseQuestions, Questions } from '../interfaces/questionsType'

export function useRoom(roomId: string | string[] | undefined) {
    const { user } = useAuth()
    const [ title,      setTitle      ] = useState('')
    const [ questions,  setQuestions  ] = useState<Questions[]>([])
    const [ roomExists, setRoomExists ] = useState<RoomExistsType>({ room: false, loaded: false }) // - The second parameter will always be true if the component update is loaded

    useEffect(() => {
        if (roomId === undefined) return // - Prevent undefined in loading

        const roomRef = database.ref(`rooms/${roomId}`) // ISSUE: Prevent 'cannot get roomId from 'rooms/...''

        roomRef.on('value', room => {
            const databaseRoom = room.val()

            // - Does this room exist? | Loaded?
            if (databaseRoom) {
                setRoomExists({
                    room: true,
                    loaded: true
                })
            } else {
                setRoomExists({
                    room: false,
                    loaded: true
                })

                return
            }

            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author:  value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered:    value.isAnswered,
                    likeCount: Object.values (value.likes ?? {}).length,
                    likeId:    Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })

            const sortedQuestions = parsedQuestion.slice(0).reverse() // - Ordenando por mais recente

            setTitle(databaseRoom.title)
            setQuestions(sortedQuestions)
        })

        return () => roomRef.off('value')
    }, [ roomId, user?.id ])

    return { title, questions, roomExists }
}
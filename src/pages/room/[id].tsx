import { Sidebar }    from '../../components/sidebar'
import { RoomButton } from '../../components/roomButton'

import { FormEvent, useEffect, useState } from 'react'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import { FirebaseQuestions, SendQuestions, Questions } from '../../interfaces/questionsType'

import logo from '../../../public/icons/logo.svg'

import { useRouter } from 'next/router'

import Head   from 'next/head'
import Link   from 'next/link'
import Image  from 'next/image'
import styles from '../../styles/pages/RoomQAID.module.scss'

export default function RoomQAID() {
    const { id: roomId } = useRouter().query

    const { user } = useAuth()
    const [ newQuestion, setNewQuestion ] = useState('')
    const [ questions, setQuestions ] = useState<Questions[]>([])
    const [ title, setTitle ] = useState('')

    useEffect(() => {
        if (roomId === undefined) return // - Prevent undefined in loading

        const roomRef = database.ref(`rooms/${roomId}`) // ISSUE: Prevent "cannot get roomId from 'rooms/...'"

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestion)
        })
    }, [ roomId ])

    const handleSendQuestion = async (event: FormEvent) => {
        event.preventDefault()

        if (newQuestion.trim() === '') return

        if(!user) {
            throw new Error('You must be logged in')
            // - react hot toast
        }

        const question: SendQuestions = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

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
                <title>Room Q&amp;A | Letmeask</title>
            </Head>

            <Sidebar />

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && (
                        <>
                            { questions.length > 1 ? (
                                <span>{questions.length} perguntas</span>
                            ) : (
                                <span>{questions.length} pergunta</span>
                            ) }
                        </>
                    ) }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                        required
                    />
                    <div className={styles.formFooter}>
                        { user ? (
                            <div className={styles.userInfo}>
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    width={imgSizeShort}
                                    height={imgSizeShort}
                                    decoding="async"
                                    quality={100}
                                    priority
                                />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça o seu login.</button></span>
                        ) }
                        <RoomButton type="submit" disabled={!user}>Enviar pergunta</RoomButton>
                    </div>
                </form>

                { JSON.stringify(questions) }
            </main>
        </div>
    )
}
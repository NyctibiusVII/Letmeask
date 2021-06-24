import { Sidebar }  from '../../../components/sidebar'
import { Question } from '../../../components/question'

import { database } from '../../../services/firebase'
import { useRoom }  from '../../../hooks/useRoom'

import trash from '../../../../public/icons/delete.svg'

import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../../styles/pages/RoomQAIDAdmin.module.scss'

export default function RoomQAIDAdmin() {
    const { id: roomId } = useRouter().query

    const { questions, title } = useRoom(roomId)

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
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
                <title>Room Q&amp;A - Admin | Letmeask</title>
            </Head>

            <Sidebar />

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && (
                        <>
                            {questions.length > 1 ? (
                                <span>{questions.length} perguntas</span>
                            ) : (
                                <span>{questions.length} pergunta</span>
                            )}
                        </>
                    )}
                </div>

                <div className={styles.questionList}>
                    { questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    aria-label="Deletar pergunta"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <Image
                                        src={trash}
                                        alt="Deletar pergunta"
                                        height={imgSizelittle + 4}
                                        width={imgSizelittle + 4}
                                    />
                                </button>
                            </Question>
                        )
                    }) }
                </div>
            </main>
        </div>
    )
}
import { Sidebar }  from '../../../components/sidebar'
import { Question } from '../../../components/question'

import { database } from '../../../services/firebase'
import { useRoom }  from '../../../hooks/useRoom'

import check  from '../../../../public/icons/check.svg'
import answer from '../../../../public/icons/answer.svg'
import trash  from '../../../../public/icons/delete.svg'

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

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
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
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >
                                { !question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Marcar pergunta como respondida"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <Image
                                                src={check}
                                                alt="Marcar pergunta como respondida"
                                                height={imgSizelittle + 4}
                                                width={imgSizelittle + 4}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Destacar pergunta"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <Image
                                                src={answer}
                                                alt="Dar destaque à pergunta"
                                                height={imgSizelittle + 4}
                                                width={imgSizelittle + 4}
                                            />
                                        </button>
                                    </>
                                ) }
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
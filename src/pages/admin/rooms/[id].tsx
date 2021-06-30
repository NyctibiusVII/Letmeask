import _404 from '../../404'

import { Loading }    from '../../../components/Loading'
import { Sidebar }    from '../../../components/sidebar'
import { RoomButton } from '../../../components/roomButton'
import { Question }   from '../../../components/question'
import { CreatedBy }  from '../../../components/CreatedBy'

import { ModalContext } from '../../../contexts/ModalContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'
import { useToasts } from 'react-toast-notifications'
import { database }  from '../../../services/firebase'
import { useRoom }   from '../../../hooks/useRoom'
import { useAuth }   from '../../../hooks/useAuth'

import { OpenModalContext } from '../../../interfaces/modalTypes'
import { Load }             from '../../../interfaces/loadType'

import emptyQuestions from '../../../../public/icons/empty-questions.svg'

import Head   from 'next/head'
import Router, { useRouter } from 'next/router'
import Image  from 'next/image'
import styles from '../../../styles/pages/RoomQAIDAdmin.module.scss'

export default function RoomQAIDAdmin() {
    const { id: roomId } = useRouter().query

    const { user }     = useAuth()
    const { addToast } = useToasts()
    const { title, questions, roomExists } = useRoom(roomId)
    const [ load, setLoad ] = useState<Load>({
        roomExists: false,
        _404:       false,
        roomOpen:   false,
        authorizedEntry: false
    })

    const { openModal } = useContext(ModalContext)

    useEffect(() => {
        if (roomId === undefined) return // - Prevent undefined in loading
        if (!roomExists.loaded)   return
        if (user   === undefined) return // - Prevent undefined in loading

        if (roomExists.room) {
            setLoad({ roomExists: true, roomOpen: false, authorizedEntry: false })

            const roomRef = database.ref(`rooms/${roomId}`)

            roomRef.get().then(room => {
                if (!room.val().closedAt)
                    setLoad({ roomExists: true, roomOpen: true, authorizedEntry: false })
                else {
                    const roomClosed = async() => {
                        addToast('Esta sala ja foi encerrada!', {
                            appearance: 'error',
                            autoDismissTimeout: 5000
                        })

                        // - Redirect
                        await Router.push('/')
                    }
                    return () => roomClosed()
                }

                if (room.val().authorId === user?.id)
                    setLoad({ roomExists: true, roomOpen: true, authorizedEntry: true })
                else {
                    const authorization = async() => {
                        addToast('Acesso Negado! Você não tem autorazação para entar nesta sala.', {
                            appearance: 'error',
                            autoDismissTimeout: 5000
                        })

                        // - Redirect
                        await Router.push('/')
                    }
                    return () => authorization()
                }
            })
        } else setLoad({ roomExists: false, _404: true, roomOpen: false, authorizedEntry: false })
    }, [ roomId, roomExists, user, addToast ])

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await
            database
                .ref(`rooms/${roomId}/questions/${questionId}`)
                .update({
                    isAnswered: true,
                })
    }
    async function handleHighlightQuestion(questionId: string, highLighted: boolean | undefined) {
        if (highLighted) {
            await
                database
                    .ref(`rooms/${roomId}/questions/${questionId}`)
                    .update({
                        isHighLighted: false,
                    })
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighLighted: true,
            })
        }
    }

    const closeRoomProps: OpenModalContext = {
        'icon':  'close',
        'title': 'Encerrar sala',
        'txtConcludeBtn': 'Sim, encerrar',
        'description': 'Tem certeza que você deseja encerrar esta sala?',
        'whichMethod': 'closeRoom'
    }
    const deleteQuestionProps: OpenModalContext = {
        'icon':  'trash',
        'title': 'Excluir pergunta',
        'txtConcludeBtn': 'Sim, excluir',
        'description': 'Tem certeza que você deseja excluir esta pergunta?',
        'whichMethod': 'deleteQuestion'
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
        <>
            { load.roomExists ? (
                <div className={styles.container}>
                    <Head>
                        <title>Room Q&amp;A - Admin | Letmeask</title>
                    </Head>

                    <Sidebar>
                        { load.roomOpen && (
                            <RoomButton
                                title="Encerrar sala"
                                onClick={() => openModal(closeRoomProps)}
                                isOutlined
                            >
                                Encerrar sala
                            </RoomButton>
                        ) }
                    </Sidebar>

                    { load.roomOpen && load.authorizedEntry ? (
                        <main>
                            <div className={styles.roomTitle}>

                                <span id={styles.functionRoom}>{'_SALA'}
                                    <span id={styles.codeParams}>
                                        {'('}
                                            <span id={styles.codeDestruct}>
                                                {'{'}
                                                &nbsp;&nbsp;
                                                    <span id={styles.codeData}>{'data'}</span>
                                                &nbsp;&nbsp;
                                                {'}'}
                                                <span id={styles.twoPoints}>{':'}&nbsp;&nbsp;</span>
                                                {'db'}
                                            </span>
                                        {')'}
                                    </span>
                                    <span id={styles.codeBlock}>
                                        {'{'}
                                            { title && (
                                                <h1 id={styles.titleId}>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;{title.split(' ').join('_')}
                                                    <span id={styles.codeMethodParam}>
                                                        {'('}
                                                            <span id={styles.data}>{'data'}</span>
                                                        {')'}
                                                    </span>
                                                </h1>
                                            ) }
                                        {'}'}
                                    </span>
                                </span>

                                { questions.length > 0 && (
                                    <>
                                        { questions.length > 1 ? (
                                            <span className={styles.questionCount}>{questions.length} perguntas</span>
                                        ) : (
                                            <span className={styles.questionCount}>{questions.length} pergunta</span>
                                        ) }
                                    </>
                                ) }
                            </div>

                            <div className={styles.questionList}>
                                { questions.length > 0 ? (
                                    <>
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
                                                                title="Marcar pergunta como respondida"
                                                                aria-label="Marcar pergunta como respondida"
                                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                                            >
                                                                <svg id={styles.check} width={imgSizelittle + 4} height={imgSizelittle + 4} viewBox={`0 0 ${imgSizelittle + 4} ${imgSizelittle + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                title="Destacar pergunta"
                                                                aria-label="Destacar pergunta"
                                                                onClick={() => handleHighlightQuestion(question.id, question.isHighLighted)}
                                                            >
                                                                <svg id={styles.answer} width={imgSizelittle + 4} height={imgSizelittle + 4} viewBox={`0 0 ${imgSizelittle + 4} ${imgSizelittle + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </button>
                                                        </>
                                                    ) }
                                                    <button
                                                        type="button"
                                                        title="Deletar pergunta"
                                                        aria-label="Deletar pergunta"
                                                        onClick={() => { openModal(deleteQuestionProps, question.id) }}
                                                    >
                                                        <svg id={styles.trash} width={imgSizelittle + 4} height={imgSizelittle + 4} viewBox={`0 0 ${imgSizelittle + 4} ${imgSizelittle + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3 5.99988H5H21" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </Question>
                                            )
                                        }) }
                                    </>
                                ) : (
                                    <div className={styles.emptyQuestions}>
                                        <Image
                                            src={emptyQuestions}
                                            alt="Sem perguntas"
                                            height={imgSizeMedium * 2}
                                            width={imgSizeMedium * 2}
                                        />
                                        <h3>Nenhuma pergunta por aqui...</h3>
                                        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
                                    </div>
                                ) }
                            </div>

                            { user && <CreatedBy /> }
                        </main>
                    ) : <Loading /> }
                </div>
            ) : (
                <>
                    { load._404 ? _404() : <Loading /> }
                </>
            ) }
        </>
    )
}
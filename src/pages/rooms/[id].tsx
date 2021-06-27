import { Sidebar }      from '../../components/sidebar'
import { RoomButton }   from '../../components/roomButton'
import { Question }     from '../../components/question'
import { GoogleButton } from '../../components/googleButton'
import { CreatedBy }    from '../../components/CreatedBy'

import ReactLoading from 'react-loading'

import {
    FormEvent,
    useEffect,
    useState
} from 'react'
import { database }  from '../../services/firebase'
import { useAuth }   from '../../hooks/useAuth'
import { useRoom }   from '../../hooks/useRoom'
import { useToasts } from 'react-toast-notifications'
import { SendQuestions } from '../../interfaces/questionsType'

import Head   from 'next/head'
import Router, { useRouter } from 'next/router'
import Image  from 'next/image'
import styles from '../../styles/pages/RoomQAID.module.scss'

export default function RoomQAID() {
    const { id: roomId } = useRouter().query

    const { user } = useAuth()
    const { addToast } = useToasts()
    const { questions, title } = useRoom(roomId)
    const [ newQuestion, setNewQuestion ] = useState('')
    const [ isValidatedPage, setIsValidatedPage ] = useState(false)
    const maxCharacters  = 1000
    const restCharacters = maxCharacters - newQuestion.length

    useEffect(() => {
        if (roomId === undefined) return // - Prevent undefined in loading

        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.get().then(room => {
            if (room.val().closedAt) {
                const  entering = async() => {
                    addToast('Esta sala ja foi encerrada!', {
                        appearance: 'error',
                        autoDismissTimeout: 5000
                    })

                    // - Redirect
                    await Router.push('/')
                }
                return () => entering()
            } else setIsValidatedPage(true)
        })
    }, [ roomId, addToast ])

    const handleSendQuestion = async (event: FormEvent) => {
        event.preventDefault()

        if (newQuestion.trim() === '') return
        if (!user) return

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

    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if (likeId) {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
            })
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
                <title>Room Q&amp;A | Letmeask</title>
            </Head>

            <Sidebar />

            { isValidatedPage ? (
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

                    <form onSubmit={handleSendQuestion}>
                        <textarea
                            placeholder="O que você quer perguntar?"
                            onChange={event => setNewQuestion(event.target.value)}
                            value={newQuestion}
                            maxLength={maxCharacters}
                        />
                        <div className={styles.maxCharacters}>
                            <span>{restCharacters}</span>
                        </div>
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
                                <span>Para enviar uma pergunta, <GoogleButton context='other' text="faça o seu login." /></span>
                            ) }
                            <RoomButton type="submit" disabled={!user}>Enviar pergunta</RoomButton>
                        </div>
                    </form>

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
                                                <button
                                                    className={`${styles.likeButton} ${question.likeId ? styles.liked : ''}`}
                                                    type="button"
                                                    aria-label="Marcar como gostei"
                                                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                                                >
                                                    { question.likeCount > 0 && <span>{question.likeCount}</span> }
                                                    <svg width={imgSizelittle + 4} height={imgSizelittle + 4} viewBox={`0 0 ${imgSizelittle + 4} ${imgSizelittle + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="var(--dark-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            ) }
                                        </Question>
                                    )
                                }) }
                            </>
                        ) : (
                            <>
                                { !user && (
                                    <div className={styles.emptyQuestions}>
                                        <h3>Nenhuma pergunta por aqui...</h3>
                                        <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
                                    </div>
                                ) }
                            </>
                        ) }
                    </div>

                    { user && <CreatedBy /> }
                </main>
            ) : (
                <div className={styles.reactLoading}>
                    <ReactLoading type='bubbles' color='#835afd' height={'10%'} width={'10%'} />
                </div>
            ) }
        </div>
    )
}
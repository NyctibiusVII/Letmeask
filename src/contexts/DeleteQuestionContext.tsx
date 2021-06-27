import {
    createContext,
    ReactNode
} from 'react'
import { database }  from '../services/firebase'
import { useRouter } from 'next/router'

interface DeleteQuestionContextData {
    handleDeleteQuestion: (questionId: string) => Promise<void>
}
interface DeleteQuestionProviderProps {
    children: ReactNode
}

export const DeleteQuestionContext = createContext({} as DeleteQuestionContextData)

export function DeleteQuestionProvider({ children }: DeleteQuestionProviderProps) {
    const { id: roomId } = useRouter().query

    async function handleDeleteQuestion(questionId: string) {
        await
            database
                .ref(`rooms/${roomId}/questions/${questionId}`)
                .remove()
    }

    return (
        <DeleteQuestionContext.Provider
            value={{
                handleDeleteQuestion
            }}
        >
            { children }
        </DeleteQuestionContext.Provider>
    )
}
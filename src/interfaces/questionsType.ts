import { ReactNode } from 'react'

export type FirebaseQuestions = Record<string, {
    content: string
    author: {
        name:   string
        avatar: string
    }
    isHighLighted: boolean
    isAnswered:    boolean
    likes: Record<string, {
        authorId: string
    }>
}>

export type SendQuestions = {
    content: string
    author: {
        name:   string
        avatar: string
    }
    isHighLighted: boolean
    isAnswered:    boolean
}

export type Questions = {
    id:      string
    content: string
    author: {
        name:   string
        avatar: string
    }
    isHighLighted: boolean
    isAnswered:    boolean
    likeCount: number
    likeId:    string | undefined
}

export type QuestionCardProps = {
    content: string
    author: {
        name:   string
        avatar: string
    }
    children?: ReactNode
}
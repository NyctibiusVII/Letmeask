export type FirebaseQuestions = Record<string, {
    content: string,
    author: {
        name: string
        avatar: string
    },
    isHighLighted: boolean
    isAnswered: boolean
}>

export type SendQuestions = {
    content: string
    author: {
        name: string
        avatar: string
    },
    isHighLighted: boolean
    isAnswered: boolean
}

export type Questions = {
    id: string
    content: string
    author: {
        name: string
        avatar: string
    },
    isHighLighted: boolean
    isAnswered: boolean
}
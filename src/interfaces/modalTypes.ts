export type OpenModalContext = {
    icon:           'close' | 'trash' | 'valueless'
    title:          string
    txtConcludeBtn: string
    description:    string
    whichMethod:    'closeRoom' | 'deleteQuestion' | 'valueless'
}
export type SetDataModal = {
    icon:           'close' | 'trash' | 'valueless'
    title:          string
    txtConcludeBtn: string
    description:    string
    param?:         string
    whichMethod:    'closeRoom' | 'deleteQuestion' | 'valueless'
}
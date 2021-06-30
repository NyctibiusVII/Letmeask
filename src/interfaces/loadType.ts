export type LoadingProps = {
    color?:  string
    width?:  string
    height?: string
}

export type Load = {
    roomExists:      boolean
    _404?:           boolean
    roomOpen:        boolean
    authorizedEntry: boolean
}
import { Modal } from '../components/Modal'

import { OpenModalContext, SetDataModal } from '../interfaces/modalTypes'

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react'

import Router  from 'next/router'

interface ModalContextData {
    openModal:  ({ icon, title, txtConcludeBtn, description, whichMethod }: OpenModalContext, param?: string) => void
    closeModal: () => void
}
interface ModalProviderProps {
    children: ReactNode
}

export const ModalContext = createContext({} as ModalContextData)

export function ModalProvider({ children }: ModalProviderProps) {
    const [ icon,           setIcon ]           = useState<'close' | 'trash' | 'valueless'>('valueless')
    const [ title,          setTitle ]          = useState<string>('')
    const [ description,    setDescription ]    = useState<string>('')
    const [ txtConcludeBtn, setTxtConcludeBtn ] = useState<string>('')
    const [ param,          setParam ]          = useState<string | undefined>()
    const [ whichMethod,    setWhichMethod ]    = useState<'closeRoom' | 'deleteQuestion' | 'valueless'>('valueless')

    const [ isModalOpen, setIsModalOpen ] = useState(false)

    function openModal({ icon, title, txtConcludeBtn, description, whichMethod }: OpenModalContext, param?: string) {
        const req = { icon, title, txtConcludeBtn, description, param, whichMethod }

        setDataModal(req)
            .then(() => setIsModalOpen(true))
    }
    function closeModal() {
        setIsModalOpen(false)
        resetDataModal()
    }

    const setDataModal = ({ icon, title, txtConcludeBtn, description, param, whichMethod }: SetDataModal): Promise<[void, void, void, void, void, void]> => {
        return Promise.all([
            setIcon(icon),
            setTitle(title),
            setTxtConcludeBtn(txtConcludeBtn),
            setDescription(description),
            setParam(param),
            setWhichMethod(whichMethod)
        ])
    }
    const resetDataModal = () => {
        setIcon('valueless')
        setTitle('')
        setTxtConcludeBtn(''),
        setDescription('')
        setParam(undefined)
        setWhichMethod('valueless')
    }

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            { children }
            {
                isModalOpen
                &&
                <Modal
                    icon={icon}
                    title={title}
                    txtConcludeBtn={txtConcludeBtn}
                    description={description}
                    param={param}
                    whichMethod={whichMethod}
                />
            }
        </ModalContext.Provider>
    )
}
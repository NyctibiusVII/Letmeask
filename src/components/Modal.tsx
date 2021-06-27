import { ModalContext }          from '../contexts/ModalContext'
import { CloseRoomContext }      from '../contexts/CloseRoomContext'
import { DeleteQuestionContext } from '../contexts/DeleteQuestionContext'

import { useContext }   from 'react'
import { SetDataModal } from '../interfaces/modalTypes'

import styles from '../styles/components/Modal.module.scss'

export function Modal({ icon, title, txtConcludeBtn, description, param, whichMethod }: SetDataModal) {
    const { closeModal }           = useContext(ModalContext)
    const { handleEndRoom }        = useContext(CloseRoomContext)
    const { handleDeleteQuestion } = useContext(DeleteQuestionContext)

    /**
     *  console.log(`
     *      icon: ${icon}
     *      title: ${title}
     *      txtConcludeBtn: ${txtConcludeBtn}
     *      description: ${description}
     *      param: ${param}
     *      whichMethod: ${whichMethod}
     *  `) // - Look info
     */

    const handleConclude = () => {
        switch (whichMethod) {
            case 'closeRoom': handleEndRoom(); closeModal()
                break
            case 'deleteQuestion': handleDeleteQuestion(param!).finally(() => closeModal())
                break
            default: return
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
            <div className={styles.content}>
                <div className={styles.info}>
                    { icon === 'close' ? (
                        <svg id={styles.close} width={imgSizeSmall + 4} height={imgSizeSmall + 4} viewBox={`0 0 ${imgSizeSmall + 4} ${imgSizeSmall + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.66 18.3398L18.34 29.6598" stroke="var(--red-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.66 29.6598L18.34 18.3398" stroke="var(--red-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z" stroke="var(--red-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg id={styles.trash} width={imgSizeSmall + 4} height={imgSizeSmall + 4} viewBox={`0 0 ${imgSizelittle + 4} ${imgSizelittle + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.99988H5H21" stroke="var(--red-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="var(--red-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) }
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className={styles.action}>
                    <button className={styles.cancel}   onClick={() => closeModal()}>Cancelar</button>
                    <button className={styles.conclude} onClick={() => handleConclude()}>{txtConcludeBtn}</button>
                </div>
            </div>
        </div>
    )
}
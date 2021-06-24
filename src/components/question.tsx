import { QuestionCardProps } from '../interfaces/questionsType'

import Image  from 'next/image'
import styles from '../styles/components/Question.module.scss'

export function Question({ content, author, children }: QuestionCardProps) {
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
            <p>{content}</p>

            <footer>
                <div className={styles.userInfo}>
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        height={imgSizeShort}
                        width={imgSizeShort}
                    />
                    <span>{author.name}</span>
                </div>

                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}
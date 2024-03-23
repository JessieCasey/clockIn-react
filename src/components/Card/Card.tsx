import styles from './Card.module.css';
import {CardProps} from './Card.props.ts';
import {useState} from 'react';
import cn from 'classnames';


function Card({name, description, imageUrl, foundByUser, ...props}: CardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const flipCard = () => {
        setIsAnimation(true);
        setIsFlipped((prevState) => !prevState);
        // Hide the image after 0.5 seconds
        setTimeout(() => {
            setIsFlipped((prevState) => prevState);
            setIsAnimation(false);
        }, 380);
    };

    return (
        <div className={cn(styles['card'], 'animate__animated animate__bounceIn')}
             onClick={flipCard} {...props}>
            <div className={cn(styles['content'], {
                [styles['flipped']]: foundByUser && isFlipped,
                [styles['grey-filter']]: !foundByUser,
                [styles['cursor-pointer']]: foundByUser
            })}
            >
                {foundByUser && isFlipped && !isAnimation ? (
                    <div className={styles['description']}>{description}</div>
                ) : (
                    <img src={imageUrl} alt="imageOfCharacter" unselectable="on"/>
                )}
            </div>
            <div className={styles.footer}>
                {name}
            </div>
        </div>
    );
}

export default Card;
import styles from './Cards.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import Card from '../../components/Card/Card.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import RarityLabel from '../../components/RarityLabel/RarityLabel.tsx';
import {Rarity} from '../../interfaces/rarity.interfaces.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {useEffect, useState} from 'react';
import {UserCards} from '../../interfaces/user.interface.ts';

export function Cards() {
    const [cardsRarityIndex, setCardsRarityIndex] = useState<number>(0);
    const [cardsToDisplay, setCardsToDisplay] = useState<UserCards | null>(null);
    const rarities: Rarity[] = [Rarity.COMMON, Rarity.RARE, Rarity.EPIC];
    const cards = useSelector((state: RootState) => state.cards);


    useEffect(() => {
        setCardsToDisplay(cards.commonCards);
    }, [cards.commonCards]);

    useEffect(() => {
        switch (cardsRarityIndex) {
            case 0:
                setCardsToDisplay(cards.commonCards);
                break;
            case 1:
                setCardsToDisplay(cards.rareCards);
                break;
            case 2:
                setCardsToDisplay(cards.epicCards);
                break;
        }

    }, [cardsRarityIndex, cards]);
    const handleNextRarity = () => {
        setCardsRarityIndex((prevIndex) => (prevIndex + 1) % rarities.length);
    };

    const handlePreviousRarity = () => {
        setCardsRarityIndex((prevIndex) => (prevIndex - 1 + rarities.length) % rarities.length);
    };

    return (
        <div className={styles.layout}>
            <div className={styles['control-menu']}>
                <div onClick={handlePreviousRarity}>
                    <FontAwesomeIcon className={styles.button} icon={faChevronLeft}/>
                </div>
                <div className={styles['header']}>
                    {/* Display rarity based on selected rarity */}
                    <Headline>Medieval {`(${cardsToDisplay?.userFoundAmount}/${cardsToDisplay?.totalAmount})`}</Headline>
                    <RarityLabel rarity={rarities[cardsRarityIndex]}>
                        {`${rarities[cardsRarityIndex].valueOf().toLowerCase()} rarity`}
                    </RarityLabel>
                </div>
                <div onClick={handleNextRarity}>
                    <FontAwesomeIcon className={styles.button} icon={faChevronRight}/>
                </div>
            </div>
            <div className={styles.cards}>
                {/* Display cards based on selected rarity */}
                {cardsToDisplay && cardsToDisplay.cards.map((card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        description={card.description}
                        rarity={card.rarity}
                        imageUrl={card.imageUrl}
                        foundByUser={card.foundByUser}
                    />
                )))}
            </div>
        </div>
    );
}

import styles from './Cards.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import Card from '../../components/Card/Card.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import RarityLabel from '../../components/RarityLabel/RarityLabel.tsx';
import {Rarity} from '../../interfaces/rarity.interfaces.ts';

export function Cards() {
    // Create an array to hold the IDs for 15 cards
    const cardIds = Array.from({length: 15}, (_, index) => index + 1);

    return (
        <div className={styles['layout']}>
            <div className={styles['control-menu']}>
                <div>
                    <FontAwesomeIcon className={styles['button']} icon={faChevronLeft}/>
                </div>
                <div>
                    <Headline>Medieval (3/12)</Headline>
                    <RarityLabel rarity={Rarity.COMMON}>Common rarity</RarityLabel>
                </div>
                <div>
                    <FontAwesomeIcon className={styles['button']} icon={faChevronRight}/>
                </div>
            </div>
            <div className={styles['cards']}>
                {/* Map over the cardIds array and render a Card component for each ID */}
                <Card
                    key={'2'} // Always include a unique key prop when rendering a list of components
                    id={'2'.toString()} // Convert id to string if needed
                    name={`Card ${'2'}`} // Example name
                    description={`Description about Card ${'2'}`} // Example description
                    rarity={'COMMON'} // Example rarity
                    imageUrl={'https://clickin-storage.s3.eu-central-1.amazonaws.com/adventurer_01_00_high_res.png'} // Example image URL
                    foundByUser={true} // Example foundByUser
                />
                {cardIds.map(id => (
                    <Card
                        key={id} // Always include a unique key prop when rendering a list of components
                        id={id.toString()} // Convert id to string if needed
                        name={`Card ${id}`} // Example name
                        description={`Description about Card ${id}`} // Example description
                        rarity={'COMMON'} // Example rarity
                        imageUrl={'https://clickin-storage.s3.eu-central-1.amazonaws.com/adventurer_01_00_high_res.png'} // Example image URL
                        foundByUser={false} // Example foundByUser
                    />
                ))}
            </div>
        </div>
    );
}

import styles from './Home.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import Timer from '../../components/Timer/Timer.tsx';
import {useState} from 'react';
import {CardProps} from '../../components/Card/Card.props.ts';
import Card from '../../components/Card/Card.tsx';
import Paragraph from '../../components/Paragraph/Paragraph.tsx';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';

export function Home() {
    const profile = useSelector((s: RootState) => s.user.profile);
    const [wonCard, setWonCard] = useState<CardProps | null>(null);
    const [chestOpen, setChestOpen] = useState<boolean>(false); // Initial remaining time equals to durationSec
    const [isPlaying, setPlaying] = useState(false);

    return <div className={cn(styles.layout, 'animate__animated animate__fadeIn')}
                style={{backgroundImage: isPlaying ? 'none' : 'url(\'/public/backgrounds/home-background.png\')'}}>
        {isPlaying && (
            <video autoPlay loop muted className={cn(styles.video, 'animate__animated', 'animate__fadeIn')}>
                <source src="/backgrounds/play-in-background.mov" type="video/mp4"/>
                {/* Add additional <source> elements for other video formats if needed */}
                Your browser does not support the video tag.
            </video>
        )}
        {chestOpen && wonCard ? (
            <div className={styles['won-card']}>
                <div>
                    <Headline>Congratulate 🎉</Headline>
                    <Paragraph>Hey! {profile?.username}, you have won {wonCard.name}, also you've saved
                        for {profile?.secondsSaved} seconds!</Paragraph>
                </div>
                <Card id={wonCard.id} name={wonCard.name} description={wonCard.description} rarity={wonCard.rarity}
                      imageUrl={wonCard.imageUrl} foundByUser={wonCard.foundByUser}/>
                <Button onClick={() => {
                    setWonCard(null);
                    setChestOpen(false);
                }}>Continue</Button>
            </div>
        ) : <>
            <Headline>Hi! {profile?.username}, nice to see you!</Headline>
            <Timer setWonCard={setWonCard} setChestOpen={setChestOpen} isPlaying={isPlaying}
                   setPlaying={setPlaying}/>
        </>}
    </div>;
}
import {useState} from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';
import styles from './Home.module.css';
import {RootState} from '../../store/store';
import Headline from '../../components/Heading/Headline';
import Timer from '../../components/Timer/Timer';
import Card from '../../components/Card/Card';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';
import {CardProps} from '../../components/Card/Card.props.ts';

export function Home() {
    const {profile} = useSelector((state: RootState) => state.user);
    const [wonCard, setWonCard] = useState<CardProps | null>(null);
    const [chestOpen, setChestOpen] = useState<boolean>(false);
    const [isPlaying, setPlaying] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClicked = (value: boolean) => {
        setButtonClicked(value);
        if (!value) {
            setTimeout(() => {
                setPlaying(value);
            }, 500);
        } else {
            setPlaying(value);
        }
    };

    return (
        <div className={cn(styles.layout, 'animate__animated', 'animate__fadeIn')}
             style={{backgroundImage: isPlaying ? 'none' : 'url(\'/public/backgrounds/home-background.png\')'}}>
            {isPlaying && (
                <video autoPlay loop muted className={cn(styles.video, 'animate__animated', {
                    ['animate__zoomIn']: buttonClicked,
                    ['animate__zoomOut']: !buttonClicked
                })}>
                    <source src="/backgrounds/play-in-background.mov" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )}
            {chestOpen && wonCard ? (
                <WonCardDisplay
                    profile={profile}
                    wonCard={wonCard}
                    setWonCard={setWonCard}
                    setChestOpen={setChestOpen}
                />
            ) : (
                <WelcomeDisplay
                    profile={profile}
                    setWonCard={setWonCard}
                    setChestOpen={setChestOpen}
                    isPlaying={isPlaying}
                    setPlaying={handleButtonClicked}
                />
            )}
        </div>
    );
}

const WelcomeDisplay = ({profile, setWonCard, setChestOpen, isPlaying, setPlaying}) => (
    <div className={cn('animate__animated', 'animate__fadeIn')}>
        {!isPlaying && <Headline>Hi! {profile?.username} 👋</Headline>}
        <Timer setWonCard={setWonCard} setChestOpen={setChestOpen} isPlaying={isPlaying} setPlaying={setPlaying}/>
    </div>
);

const WonCardDisplay = ({profile, wonCard, setWonCard, setChestOpen}) => (
    <div className={cn(styles['won-card'], 'animate__animated', 'animate__fadeIn')}>
        <div>
            <Headline>Congratulate 🎉</Headline>
            <Paragraph>Hey! {profile?.username}, you have won {wonCard.name}, also you've saved
                for {profile?.secondsSaved} seconds!</Paragraph>
        </div>
        <Card
            id={wonCard.id}
            name={wonCard.name}
            description={wonCard.description}
            rarity={wonCard.rarity}
            imageUrl={wonCard.imageUrl}
            foundByUser={wonCard.foundByUser}
        />
        <Button onClick={() => {
            setWonCard(null);
            setChestOpen(false);
        }}>Continue</Button>
    </div>
);

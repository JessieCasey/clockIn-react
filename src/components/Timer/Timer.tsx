import React, {useEffect, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import styles from './Timer.module.css';
import Button from '../Button/Button.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import TimerInput from './TimerInput/TimerInput.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {CardProps} from "../Card/Card.props.ts";
import axios, {AxiosError} from "axios";
import {PREFIX} from "../../helpers/API.ts";
import Card from "../Card/Card.tsx";
import {fetchCardsAsync} from "../../store/cards.slice.ts";

const timerProps = {
    colors: ['#63D683'],
    size: 300,
    strokeWidth: 6,
    colorsTime: []
};

function Timer() {
    const [isPlaying, setPlaying] = useState(false);
    const [durationSec, setDurationSec] = useState(0); // Initial duration in seconds (10 minutes)
    const [remainingTime, setRemainingTime] = useState(durationSec); // Initial remaining time equals to durationSec
    const [wonCard, setWonCard] = useState<CardProps | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, profile} = useSelector((s: RootState) => s.user);
    const minuteSeconds = 30;

    useEffect(() => {
        setRemainingTime(durationSec);
    }, [durationSec]);

    useEffect(() => {
        let intervalId: number | undefined;

        if (isPlaying) {
            intervalId = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(intervalId);
                        setPlaying(false);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isPlaying]);

    const handleStart = () => {
        setPlaying(true);
    };

    const handleStop = () => {
        setPlaying(false);
    };

    const handleIncrement = () => {
        setDurationSec(prevDuration => prevDuration + minuteSeconds);
    };

    const handleDecrement = () => {
        setDurationSec(prevDuration => (prevDuration - minuteSeconds >= 0) ? prevDuration - minuteSeconds : 0);
    };

    const handleTimerComplete = async () => {
        try {
            const requestBody = {
                userId: profile?.id,
                durationInSec: durationSec
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            };

            const {data} = await axios.post<CardProps>(
                `${PREFIX}/cards/win`,
                JSON.stringify(requestBody),
                {headers}
            );

            setWonCard(data);
            dispatch(fetchCardsAsync());
        } catch
            (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.errorDetails);
            }
            throw new Error('Error is sent');
        }

    };

    return (
        <div className={styles['circle-timer']}>
            {wonCard && (
                <div className={styles['won-card']}>
                    <Card id={wonCard.id} name={wonCard.name} description={wonCard.description} rarity={wonCard.rarity}
                          imageUrl={wonCard.imageUrl} foundByUser={wonCard.foundByUser}/>
                </div>
            )}
            <CountdownCircleTimer
                key={durationSec} // Ensure re-render when duration changes
                {...timerProps}
                isPlaying={isPlaying}
                duration={durationSec}
                onComplete={handleTimerComplete}
            />
            <div className={styles['chest-img']}>
                <img src="/chest.png" alt="chest" draggable="false"/>
            </div>
            <div className={styles['timer-panel']}>
                <Button appearance={'small-bold'} onClick={handleDecrement}>-</Button>
                <TimerInput setDurationSec={setDurationSec} remainingTime={remainingTime}/>
                <Button appearance={'small-bold'} onClick={handleIncrement}>+</Button>
            </div>
            {!isPlaying && <Button appearance={'small'} onClick={handleStart}><FontAwesomeIcon icon={faPlay}/></Button>}
            {isPlaying && <Button appearance={'small'} onClick={handleStop}><FontAwesomeIcon icon={faStop}/></Button>}
        </div>
    );
}

export default Timer;

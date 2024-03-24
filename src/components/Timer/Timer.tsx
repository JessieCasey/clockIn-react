import {useEffect, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import styles from './Timer.module.css';
import Button from '../Button/Button.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import TimerInput from './TimerInput/TimerInput.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {CardProps} from '../Card/Card.props.ts';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../helpers/API.ts';
import {fetchCardsAsync} from '../../store/cards.slice.ts';
import {TimerProps} from './Timer.props.ts';
import cn from 'classnames';

const timerProps = {
    colors: ['#63D683'],
    size: 300,
    strokeWidth: 6,
    colorsTime: []
};

function Timer({setWonCard, setChestOpen, isPlaying, setPlaying}: TimerProps) {

    const [durationSec, setDurationSec] = useState(0); // Initial duration in seconds (10 minutes)
    const [remainingTime, setRemainingTime] = useState(durationSec); // Initial remaining time equals to durationSec
    const [chestAvailable, setChestAvailable] = useState<boolean>(false); // Initial remaining time equals to durationSec

    const dispatch = useDispatch<AppDispatch>();
    const {jwt, profile} = useSelector((s: RootState) => s.user);
    const secondsToHandle = 30;

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
        setDurationSec(prevDuration => prevDuration + secondsToHandle);
    };

    const handleDecrement = () => {
        setDurationSec(prevDuration => (prevDuration - secondsToHandle >= 0) ? prevDuration - secondsToHandle : 0);
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

            if (data) {
                setChestAvailable(true);
                setWonCard(data);
            }

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
            <CountdownCircleTimer
                key={durationSec} // Ensure re-render when duration changes
                {...timerProps}
                isPlaying={isPlaying}
                duration={durationSec}
                onComplete={handleTimerComplete}
            />
            {chestAvailable ?
                <div className={cn(styles['chest-img'], styles['chestAvailable'])} onClick={() => {
                    setChestOpen(true);
                    setChestAvailable(false);
                }}>
                    <img src="/chest-open.png" alt="chest" draggable="false"/>
                </div>
                :
                <div className={styles['chest-img']}>
                    <img src="/chest.png" alt="chest" draggable="false"/>
                </div>
            }
            {!chestAvailable && <div className={styles['timer-panel']}>
                {!isPlaying && <Button appearance={'small-bold'} onClick={handleDecrement}>-</Button>}
                <TimerInput setDurationSec={setDurationSec} remainingTime={remainingTime}/>
                {!isPlaying && <Button appearance={'small-bold'} onClick={handleIncrement}>+</Button>}
            </div>}
            {(!isPlaying && remainingTime > 1) &&
                <Button className={cn('animate__animated', 'animate__tada')} appearance={'small'} onClick={handleStart}><FontAwesomeIcon icon={faPlay}/></Button>}
            {isPlaying && <Button appearance={'small'} onClick={handleStop}><FontAwesomeIcon icon={faStop}/></Button>}
        </div>
    );
}

export default Timer;

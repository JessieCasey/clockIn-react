import {useEffect, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import styles from './Timer.module.css';
import Button from '../Button/Button.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import TimerInput from './TimerInput/TimerInput.tsx';

const timerProps = {
    colors: ['#63D683'],
    size: 300,
    strokeWidth: 6
};

function Timer() {
    const [isPlaying, setPlaying] = useState(false);
    const [durationSec, setDurationSec] = useState(0); // Initial duration in seconds (10 minutes)
    const [remainingTime, setRemainingTime] = useState(durationSec); // Initial remaining time equals to durationSec

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


    return (
        <div className={styles['circle-timer']}>
            <CountdownCircleTimer
                key={durationSec} // Ensure re-render when duration changes
                {...timerProps}
                isPlaying={isPlaying}
                duration={durationSec}
                onComplete={() => {
                    console.log('DONE');
                }}
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

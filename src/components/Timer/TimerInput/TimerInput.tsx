import {useEffect, useState} from 'react';
import styles from './TimerInput.module.css';
import {TimerInputProps} from './TimerInput.props.ts';
import cn from "classnames";

function TimerInput({setDurationSec, remainingTime}: TimerInputProps) {
    const [inputHours, setInputHours] = useState<string>('0');
    const [inputMinutes, setInputMinutes] = useState<string>('0');
    const [inputSeconds, setInputSeconds] = useState<string>('0');
    const [inputWidth, setInputWidth] = useState<number>(0);


    useEffect(() => {
        setInputHours(String(Math.floor(remainingTime / 3600)).padStart(2, '0'));
        setInputMinutes(String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0'));
        setInputSeconds(String(remainingTime % 60).padStart(2, '0'));
    }, [remainingTime]);


    useEffect(() => {
        const totalChars = String(inputHours).length + String(inputMinutes).length + String(inputSeconds).length;
        const minWidth = 46;
        const maxWidth = 100;
        const inputWidth = Math.min(Math.max(totalChars * 24, minWidth), maxWidth); // Adjust the width based on characters count

        setInputWidth(inputWidth); // assuming setInputWidth is a state setter function
    }, [inputHours, inputMinutes, inputSeconds]);

    const handleCustomTimeChange = () => {
        const regExp = /^\d+$/;
        if (regExp.test(inputHours)) {
            const totalSeconds = parseInt(inputHours) * 3600 + parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
            setDurationSec(totalSeconds);
        } else {
            setInputHours('00');
            setInputMinutes('00');
            setInputSeconds('00');
            setDurationSec(0);
            console.error('Input hours must contain only numbers.');
        }
    };


    return (
        <div className={styles['wrapper']}>
            <input
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                onBlur={handleCustomTimeChange}
                pattern="[0-9]*" // Only allow numbers
                style={{width: `${inputHours.length * 24}px`}} // Adjust the width dynamically based on characters count
            />
            :
            <input
                width={inputWidth}
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                onBlur={handleCustomTimeChange}
                pattern="[0-9]*"
                style={{width: `${inputMinutes.length * 24}px`}} // Adjust the width dynamically based on characters count
            />
            :
            <input
                width={inputWidth}
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                onBlur={handleCustomTimeChange}
                pattern="[0-9]*" // Only allow numbers
                style={{width: `${inputSeconds.length * 24}px`}} // Adjust the width dynamically based on characters count
            />
        </div>
    );
}

export default TimerInput;

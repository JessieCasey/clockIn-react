import {HTMLAttributes} from 'react';

export interface TimerInputProps extends HTMLAttributes<HTMLAnchorElement> {
	setDurationSec: (duration: number) => void;
	remainingTime: number
    isLogoShown?: boolean;
}
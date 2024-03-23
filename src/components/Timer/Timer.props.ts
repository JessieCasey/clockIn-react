import {HTMLAttributes} from 'react';

export interface TimerProps extends HTMLAttributes<HTMLAnchorElement> {
    setWonCard: any;
    setChestOpen: any;
    isPlaying: any;
    setPlaying: any;
}
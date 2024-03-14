import {HTMLAttributes} from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    id: string,
    name: string,
    description: string,
    rarity: string,
    imageUrl: string,
    foundByUser: boolean,
}
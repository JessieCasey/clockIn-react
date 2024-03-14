import {Rarity} from './rarity.interfaces.ts';

export interface Card {
    id: string;
    name: string;
    description: string;
    rarity: Rarity;
    imageUrl: string;
}

export interface Profile {
    id: string;
    email: string;
    username: string;
    minutesSaved: number;
    cards: Card[];
}

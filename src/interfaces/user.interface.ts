import {Rarity} from './rarity.interfaces.ts';

export interface Card {
    id: string;
    name: string;
    description: string;
    rarity: Rarity;
    imageUrl: string;
    foundByUser: boolean;
}

export interface UserCards {
    cards: Card[];
    totalAmount: number;
    userFoundAmount: number;
}

export interface UserCardsList {
    commonCards: UserCards;
    rareCards: UserCards;
    epicCards: UserCards;

    loading: boolean,
    error: string | null
}

export interface Profile {
    id: string;
    email: string;
    username: string;
    minutesSaved: number;
}

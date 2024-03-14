import {HTMLAttributes, ReactNode} from 'react';
import {Rarity} from '../../interfaces/rarity.interfaces.ts';

export interface RarityProps extends HTMLAttributes<HTMLHeadingElement> {
    rarity: Rarity;
    children: ReactNode;
}
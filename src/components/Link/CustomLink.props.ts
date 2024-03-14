import {HTMLAttributes} from 'react';

export interface CustomLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}
import {HTMLAttributes} from 'react';

export interface LogoProps extends HTMLAttributes<HTMLAnchorElement> {
	isLogoShown?: boolean;
}
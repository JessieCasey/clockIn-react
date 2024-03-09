import { HTMLAttributes, ReactNode } from 'react';

export interface ParagraphProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
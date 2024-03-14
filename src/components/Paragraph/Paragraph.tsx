import styles from './Paragraph.module.css';
import cn from 'classnames';
import {ParagraphProps} from './Paragraph.props.ts';

function Paragraph({children, className, ...props}: ParagraphProps) {
    return (
        <p className={cn(className, styles['p'])} {...props}>{children}</p>
    );
}

export default Paragraph;
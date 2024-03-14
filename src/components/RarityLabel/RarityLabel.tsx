import styles from './RarityLabel.module.css';
import cn from 'classnames';
import {RarityProps} from './Rarity.props.ts';

function RarityLabel({children, className, rarity, ...props}: RarityProps) {
    return (
        <h3 className={cn(className, styles['h3'], styles[rarity])} {...props}>{children}</h3>
    );
}

export default RarityLabel;
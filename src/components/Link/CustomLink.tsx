import styles from './CustomLink.module.css';
import {CustomLinkProps} from './CustomLink.props.ts';
import {Link} from 'react-router-dom';

function CustomLink({to, children, ...props}: CustomLinkProps) {
    return (
        <Link to={to} className={styles['link']} {...props}>
            {children}
        </Link>
    );
}

export default CustomLink;
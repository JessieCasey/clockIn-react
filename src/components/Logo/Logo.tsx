import {LogoProps} from './Logo.props.ts';
import styles from './Logo.module.css';
import {Link} from "react-router-dom";

function Logo({isLogoShown = true, ...props}: LogoProps) {
    return (
        <Link to={"/"} className={styles['logo-wrapper']} {...props}>
            {isLogoShown && <img className={styles['logo-img']} src={'/logo.svg'} alt={'Logo'}/>}
            <span>Clock In</span>
        </Link>
    );
}

export default Logo;
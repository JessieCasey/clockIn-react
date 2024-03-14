import styles from './SideBar.module.css';
import {SideBarProps} from './SideBar.props.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

function SideBar({showSidebar}: SideBarProps) {

    return (
        <div className={`${styles['menu']} ${showSidebar ? styles['show'] : ''}`}>
            <ul className={styles['menu-list']}>
                <li>
                    <NavLink to='/' className={({isActive}) => cn(styles['icon'], {
                        [styles.active]: isActive
                    })}>
                        <FontAwesomeIcon icon={faHome}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/cards' className={({isActive}) => cn(styles['icon'], {
                        [styles.active]: isActive
                    })}>
                        <FontAwesomeIcon icon={faBook}/>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}


export default SideBar;
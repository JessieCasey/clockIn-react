import {Outlet, useNavigate} from 'react-router-dom';
import Logo from '../../components/Logo/Logo.tsx';
import styles from './Layout.module.css';

export const Layout = () => {
    const navigate = useNavigate();
    const isAuthenticated = true;

    if (!isAuthenticated) {
        navigate('/authorization/sign-in');
        return null;
    }

    return (
        <div className={styles['layout']}>
            <Logo/>
            <div className={styles['content']}>
                <Outlet/>
            </div>
        </div>
    );
};
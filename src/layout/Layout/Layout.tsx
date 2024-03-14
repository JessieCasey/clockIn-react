import {Outlet, useNavigate} from 'react-router-dom';
import Logo from '../../components/Logo/Logo.tsx';
import styles from './Layout.module.css';
import {getProfile, userActions} from '../../store/user.slice.ts';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button/Button.tsx';
import {useEffect, useState} from 'react';
import SideBar from '../../components/SideBar/SideBar.tsx';

export const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/authorization/sign-in');
    };

    const [showSidebar, setShowSidebar] = useState(false);

    const handleMouseMove = (event: MouseEvent) => {
        // Check if the mouse position is within a certain threshold (e.g., 50 pixels) from the left edge
        if (event.clientX <= 130) {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles['layout']}>
            <Logo/>
            {jwt && <Button appearance={'small'} className={styles['exit']} onClick={logout}>
                LogOut
            </Button>}
            <div className={styles['wrapper']}>
                <div className={styles['sidebar']}>
                    <SideBar showSidebar={showSidebar}/>
                </div>
                <div className={styles['content']}>
                    <Outlet/>
                </div>
            </div>

        </div>
    );
};

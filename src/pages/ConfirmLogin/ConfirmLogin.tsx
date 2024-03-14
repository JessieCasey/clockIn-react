import styles from './ConfirmLogin.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {confirmLogin} from '../../store/user.slice.ts';

export function ConfirmLogin() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        // Do something with email and token
        if (email && token) {
            dispatch(confirmLogin({email: email, token: token}));
        }

    }, [email, token, dispatch]);

    useEffect(() => {
        // Do something with email and token
        if (jwt) {
            navigate('/');
        }

    }, [jwt, navigate]);

    return (
        <div className={styles['content']}>
            <Headline>Please wait till we authorize you</Headline>
            {loginErrorMessage}
        </div>
    );
}
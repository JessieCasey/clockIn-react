import styles from './Login.module.css';

import {useNavigate} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, userActions} from '../../store/user.slice';
import Headline from '../../components/Heading/Headline.tsx';
import Paragraph from '../../components/Paragraph/Paragraph.tsx';
import {AppDispatch, RootState} from '../../store/store.ts';
import CustomLink from '../../components/Link/CustomLink.tsx';
import cn from "classnames";

export type LoginForm = {
    email: {
        value: string;
    }
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, linkSent, loginErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const {email} = target;
        await sendLogin(email.value);
    };

    const sendLogin = async (email: string) => {
        dispatch(login({email}));
    };

    return <div className={styles['content']}>
        {linkSent ? (
            <>
                <Headline>Link Sent</Headline>
                <Paragraph>An email with the access link has been sent to your email address.</Paragraph>
                <Button onClick={() => navigate('/')}>Get Home</Button>
            </>
        ) : (
            <>
                <Headline>Sign in</Headline>
                {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
                <form className={cn(styles['form'], 'animate__animated', 'animate__zoomIn')} onSubmit={submit}>
                    <Input id="email" name='email' placeholder='Email' labelText="Email"/>
                    <Paragraph>No password required. We will send you a link with access <br/> to your
                        account</Paragraph>
                    <Button>Confirm</Button>
                    <CustomLink to={'/authorization/sign-up'}>Don’t have an account yet? Create one!</CustomLink>
                </form>
            </>
        )}
    </div>;
}

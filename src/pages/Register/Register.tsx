import styles from './Register.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import {FormEvent, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {register, userActions} from '../../store/user.slice.ts';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import Paragraph from "../../components/Paragraph/Paragraph.tsx";

export type RegisterForm = {
    username: {
        value: string;
    };
    email: {
        value: string;
    };
}

export function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, registerErrorMessage, linkSent} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const {email, username} = target;
        dispatch(register({email: email.value, username: username.value}));
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
                <Headline>Sign up</Headline>
                {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
                <form className={styles['form']} onSubmit={submit}>
                    <Input id="username" name='username' placeholder='Alex' labelText="How to call you?"/>
                    <Input id="email" name='email' placeholder='Email' labelText="Email"/>
                    <Paragraph>No password required. We will send you a link with access <br/> to your account</Paragraph>
                    <Button>Confirm</Button>
                </form>
            </>
        )}
    </div>;
}
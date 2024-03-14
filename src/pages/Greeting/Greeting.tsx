import styles from './Greeting.module.css';
import Button from '../../components/Button/Button.tsx';
import Headline from '../../components/Heading/Headline.tsx';
import {useNavigate} from 'react-router-dom';
import Logo from '../../components/Logo/Logo.tsx';

export function Greeting() {
    const navigate = useNavigate();

    return (
        <div className={styles['layout']}>
            <Logo/>
            <div className={styles['content']}>
                <div>
                    <img className={styles['logo']} src={'/logo.png'} alt={'main-logo'}/>
                    <Headline>Get Focused in Time - The Ultimate Work-Focused Game</Headline>
                </div>
                <Button onClick={() => navigate('/authorization/sign-in')}>Get Started</Button>
            </div>
        </div>
    );
}

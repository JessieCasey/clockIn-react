import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import styles from './Greeting.module.css';
import Logo from "../../components/Logo/Logo.tsx";
import Headline from "../../components/Heading/Headline.tsx";
import Button from "../../components/Button/Button.tsx"; // assuming you have a CSS file for Greeting component

export function Greeting() {
    const navigate = useNavigate();
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setButtonClicked(true);
        setTimeout(() => {
            navigate('/authorization/sign-in');
        }, 1000);
    };

    return (
        <div className={cn(styles.layout)}>
            <Logo/>
            <div className={cn(styles.content, 'animate__animated', {
                ['animate__fadeIn']: !buttonClicked,
                ['animate__zoomOut']: buttonClicked
            })}>
            <div>
                <img className={styles.logo} src={'/logo.png'} alt={'main-logo'}/>
                <Headline>Get Focused in Time - The Ultimate Work-Focused Game</Headline>
            </div>
            <Button onClick={handleButtonClick} className={buttonClicked ? styles.bounceOut : ''}>Get
                Started</Button>
        </div>
</div>
)
    ;
}

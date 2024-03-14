import styles from './Home.module.css';
import Headline from '../../components/Heading/Headline.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import Timer from '../../components/Timer/Timer.tsx';

export function Home() {
    const profile = useSelector((s: RootState) => s.user.profile);

    return <div className={styles['layout']}>
        <Headline>Hi! {profile?.username}, nice to see you!</Headline>
        <Timer/>
    </div>;
}
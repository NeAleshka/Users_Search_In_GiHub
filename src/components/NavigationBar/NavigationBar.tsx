import React from 'react';
import styles from './NavigationBar.module.css'
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {
    const navigate=useNavigate()
    return (
        <div className={styles.nav_bar}>
        <div className={'font-bold'}>
            GitHub Search
        </div>
            <div className={'flex'}>
                <button className={'mr-[10px]'} onClick={()=>navigate('/')}>Home</button>
                <button onClick={()=>navigate('/favorite')}>Favorite</button>
            </div>

        </div>
    );
};

export default NavigationBar;
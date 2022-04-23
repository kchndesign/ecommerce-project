import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <>
            <h1 className={Styles.HomePage__Heading}>
                Kevin's Film Store
            </h1>
            <Link className={Styles.HomePage__Link} to="film">
                Shop Film
            </Link>
            <Link className={Styles.HomePage__Link} to="cameras">
                Shop Film Cameras
            </Link>
        </>
    );
};

export default HomePage;

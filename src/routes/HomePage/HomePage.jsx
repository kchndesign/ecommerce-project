import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <>
            <h1 className={Styles.HomePage__Heading}>
                Kevin's Film Store
            </h1>
            <section
                aria-label="Navigation Links"
                className={Styles.HomePage__flexContainer}>
                <Link
                    className={Styles.HomePage__Link}
                    to="film">
                    <h2>Shop Film</h2>
                </Link>
                <Link
                    className={Styles.HomePage__Link}
                    to="cameras">
                    <h2>Shop Film Cameras</h2>
                </Link>
            </section>
        </>
    );
};

export default HomePage;

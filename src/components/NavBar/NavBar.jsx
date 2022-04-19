import React from 'react';
import Styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className={Styles.NavBar}>
            <Link to="/">
                <h2>WebShop THING</h2>
            </Link>
        </header>
    );
};

export default NavBar;

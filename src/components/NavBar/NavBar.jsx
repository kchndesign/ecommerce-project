import React from 'react';
import Styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={Styles.NavBar}>
            <Link to="/">
                <h2>Kevin's Fantasy Film shop</h2>
            </Link>
        </nav>
    );
};

export default NavBar;

import HamburgerNavList from './HamburgerNavList';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.svg';
import Cart from '../../img/cart.png';
import Styles from './NavBar.module.scss';

const NavBar = () => {
    return (
        <div className={Styles.NavBar}>
            <nav className={`${Styles.NavBar} ${Styles.NavBar__container}`}>
                <Link to="/">
                    <img
                        src={Logo}
                        className={Styles.NavBar__icon}
                        alt="store logo"
                    />
                </Link>

                <HamburgerNavList />

                <Link to="/cart">
                    <img
                        src={Cart}
                        alt="shopping cart icon"
                        className={`${Styles.NavBar__icon} ${Styles.NavBar__iconInverted}`}
                    />
                </Link>
            </nav>
        </div>
    );
};

export default NavBar;

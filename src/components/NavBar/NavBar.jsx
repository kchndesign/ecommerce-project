import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../logo.png';
import Cart from '../../cart.png';
import Styles from './NavBar.module.scss';

const NavBar = () => {
    return (
        <nav className={Styles.NavBar}>
            <div className={Styles.NavBar__container}>
                <Link to="/">
                    <img
                        src={Logo}
                        className={Styles.NavBar__icon}
                        alt="store logo"
                    />
                </Link>
                <ul>
                    <li>
                        <Link
                            className={Styles.Navbar__navLink}
                            to="/film"
                        >
                            Film
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={Styles.Navbar__navLink}
                            to="/cameras"
                        >
                            Cameras
                        </Link>
                    </li>
                </ul>

                <Link to="/cart">
                    <img
                        src={Cart}
                        alt="shopping cart icon"
                        className={Styles.NavBar__icon}
                    />
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;

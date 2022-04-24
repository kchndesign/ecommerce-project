import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './HamburgerNavList.module.scss';
import Burger from '../../../burger.svg';

export function HamburgerNavList() {
    // boolean state to toggle classNames that will hide/display the dropdown menu
    const [dropDownIsActive, setDropdownIsActive] =
        useState(false);

    const toggleActive = () => {
        setDropdownIsActive(!dropDownIsActive);
    };

    return (
        <React.Fragment>
            {/* desktop nav list */}
            <ul className={Styles.DesktopNavList}>
                <li>
                    <Link className={Styles.NavLink} to="/film">
                        Film
                    </Link>
                </li>
                <li>
                    <Link
                        className={Styles.NavLink}
                        to="/cameras">
                        Cameras
                    </Link>
                </li>
            </ul>

            {/* mobile stuff */}
            <button
                aria-haspopup="true"
                aria-expanded={dropDownIsActive}
                className={`${Styles.HamburgerNavList__button} ${Styles.HamburgerNavList}`}
                onClick={toggleActive}>
                <img
                    src={Burger}
                    alt="Open and close Nav"
                    className={Styles.HamburgerNavList__Burger}
                />
            </button>

            {/* dropdown menu */}
            <div
                role="navigation"
                className={`${Styles.HamburgerNavList} ${
                    Styles.HamburgerNavList__container
                } ${
                    dropDownIsActive
                        ? Styles.isActive
                        : Styles.isNotActive
                }`}>
                <ul className={Styles.HamburgerNavList__list}>
                    <li>
                        <Link
                            className={Styles.NavLink}
                            to="/film">
                            Film
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={Styles.NavLink}
                            to="/cameras">
                            Cameras
                        </Link>
                    </li>
                </ul>
            </div>

            {/* backdrop to the dropdown menu that allows the user to click anywhere to hide the dropdown */}
            <div
                onClick={toggleActive}
                aria-hidden={true}
                className={`${Styles.HamburgerNavList} ${
                    Styles.ClickBlocker
                } ${
                    dropDownIsActive
                        ? Styles.isActive
                        : Styles.isNotActive
                }`}></div>
        </React.Fragment>
    );
}

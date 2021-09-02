import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'
/* JK: This page loads Characters alphabetically from the Marvel API */
class Header extends Component {
    render() {
        // let limiter = 4; 
        return (
            <header className={styles.header} >
                <div className={styles.header__container}>
                    <h1>
                        <li><NavLink to="/Home">Home</NavLink></li>
                    </h1>
                </div>
            </header>
        );
    }
}
export default Header;
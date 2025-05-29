import styles from "../styles/Header.module.css";
import {HeaderProps} from "../types";
import React from "react";
import {Link} from "react-router";

const Header: React.FC<HeaderProps> = ({eventsLength}) => {
    return <header className={styles.header}>
        <div className={styles.titleSection}>
            <h2>Events ({eventsLength})</h2>
        </div>
        <Link to="new-event">
            <button className={styles.addButton}>+ Add event</button>
        </Link>
    </header>
}
export default Header;
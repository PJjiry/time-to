import styles from "../styles/Header.module.css";
import {HeaderProps} from "../types";
import React from "react";

const Header: React.FC<HeaderProps> = ({eventsLength, onOpenForm, buttonIsVisible}) => {
    return <header className={styles.header}>
        <div className={styles.titleSection}>
            <h2>Events ({eventsLength})</h2>
        </div>
        {buttonIsVisible && <button className={styles.addButton} onClick={onOpenForm}>+ Add event</button>}
    </header>
}
export default Header;
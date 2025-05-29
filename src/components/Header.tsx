import styles from "../styles/Header.module.css";
import React from "react";
import {useEvents} from "../hooks/useEvents.ts";

const Header: React.FC = () => {
    const {filteredEventsByLabel,setFormIsVisible, formIsVisible}=useEvents()
    return <header className={styles.header}>
        <div className={styles.titleSection}>
            <h2>Events ({filteredEventsByLabel.length})</h2>
        </div>
        {!formIsVisible && <button className={styles.addButton} onClick={() => setFormIsVisible((prevIsVisible) => !prevIsVisible)}>+ Add event</button>}
    </header>
}
export default Header;
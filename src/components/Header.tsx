import styles from "../styles/Header.module.css";

const Header = ()=> {
    return <header className={styles.header}>
        <div className={styles.titleSection}>
            <h2>Events (3)</h2>
        </div>
        <button className={styles.addButton}>+ Add event</button>
    </header>
}
export default Header;
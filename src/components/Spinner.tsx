import styles from "../styles/Spinner.module.css";

export const Spinner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loadingSpinner}></div>
        </div>
    )
}
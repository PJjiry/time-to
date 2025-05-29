import styles from "../styles/ErrorMessage.module.css";
import React from "react";
import {ErrorMessageProps} from "../types";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <div className={styles.errorMessage}>
            <div className={styles.errorContent}>
                <span className={styles.errorIcon}>!</span>
                <span>{message}</span>
            </div>
        </div>
    )
}
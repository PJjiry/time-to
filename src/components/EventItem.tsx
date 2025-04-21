import styles from "../styles/EventItem.module.css";
import React from "react";
import {EventItemProps} from "../types";
import {getTimeLeftFromInput} from "../utils/utils.ts";

const EventItem: React.FC<{ event: EventItemProps, onStartEdit:(event: EventItemProps) => void; }> = ({event, onStartEdit}) => {
    const timeLeft = getTimeLeftFromInput(event.datetime);

    return (
        <div
            key={event.id}
            className={`${styles.card} ${styles[event.priority]}`}
        >
            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <p><strong>Title:</strong> {event.title}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p className={styles.timeLeft}>{timeLeft}</p>
                    <div className={styles.labels}>
                        {event.labels?.map((label, index) => (
                            <span key={index} className={styles.label}>{label}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => onStartEdit(event)}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default EventItem;
import styles from "../styles/EventItem.module.css";
import React from "react";
import {EventItemProps} from "../types";
import {getLabelColor, getTimeLeftFromInput} from "../utils/utils.ts";
import {useEvents} from "../hooks/useEvents.ts";

const EventItem: React.FC<EventItemProps> = ({event}) => {
    const{ formIsVisible, handleLabelClick,startEditEventHandler, handleDeleteEvent}=useEvents()
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
                            <span key={index} className={styles.label} style={{backgroundColor: getLabelColor(label)}}
                                  onClick={() => formIsVisible ? undefined : handleLabelClick(label)}>{label}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => startEditEventHandler(event)}
                            disabled={formIsVisible}>Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => {
                        handleDeleteEvent(event.id)
                    }} disabled={formIsVisible}>Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EventItem;
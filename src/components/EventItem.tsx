import styles from "../styles/EventItem.module.css";
import React from "react";
import {EventItemProps} from "../types";
import {getLabelColor, getTimeLeftFromInput} from "../utils/utils.ts";
import {Link} from "react-router";

const EventItem: React.FC<EventItemProps> = ({event, onLabelClick}) => {
    const timeLeft = getTimeLeftFromInput(event.datetime);

    const handleLabelClick = (event: React.MouseEvent, label: string) => {
        event.preventDefault();
        onLabelClick(label);
    }

    return (
        <Link to={`/time-to/event/${event.id}`} className={styles.eventLink}>
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
                                <span key={index} className={styles.label}
                                      style={{backgroundColor: getLabelColor(label)}}
                                      onClick={(event,) => handleLabelClick(event, label)}>{label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventItem;
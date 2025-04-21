import styles from "../styles/EventsList.module.css";
import {EventItemProps} from "../types";
import React from "react";
import EventItem from "./EventItem.tsx";


const EventsList: React.FC<{events:EventItemProps[], onStartEdit: (event: EventItemProps) => void;}> = ({events, onStartEdit}) => {
    return <div className={styles.cardsContainer}>
        {events.map((event) => (
            <EventItem key={event.id} event={event} onStartEdit={onStartEdit} />
        ))}
    </div>
}

export default EventsList;

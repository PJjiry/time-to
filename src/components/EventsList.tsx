import styles from "../styles/EventsList.module.css";
import {EventItemProps} from "../types";
import React from "react";
import EventItem from "./EventItem.tsx";


const EventsList: React.FC<{events:EventItemProps[]}> = ({events}) => {
    return <div className={styles.cardsContainer}>
        {events.map((event) => (
            <EventItem key={event.id} event={event} />
        ))}
    </div>
}

export default EventsList;

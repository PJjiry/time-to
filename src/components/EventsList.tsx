import styles from "../styles/EventsList.module.css";
import React from "react";
import EventItem from "./EventItem.tsx";
import {EventListProps} from "../types";


const EventsList: React.FC<EventListProps> = ({events, onLabelClick}) => {
    return <div className={styles.cardsContainer}>
        {events.map((event) => (
            <EventItem key={event.id} event={event}
                       onLabelClick={onLabelClick}/>
        ))}
    </div>
}

export default EventsList;

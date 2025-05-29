import styles from "../styles/EventsList.module.css";
import React from "react";
import EventItem from "./EventItem.tsx";
import {useEvents} from "../hooks/useEvents.ts";


const EventsList: React.FC = () => {
    const {formIsVisible, sortedEvents} = useEvents();

    return <div className={`${styles.cardsContainer} ${formIsVisible ? styles.showForm : ""}`}>
        {sortedEvents.map((event) => (
            <EventItem key={event.id} event={event}/>
        ))}
    </div>
}

export default EventsList;

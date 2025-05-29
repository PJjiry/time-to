import styles from "../styles/EventsList.module.css";
import React from "react";
import EventItem from "./EventItem.tsx";
import {EventListProps} from "../types";


const EventsList: React.FC<EventListProps> = ({events, onStartEdit, onDelete, onLabelClick, isFormVisible}) => {
    return <div className={`${styles.cardsContainer} ${isFormVisible ? styles.showForm : ""}`}>
        {events.map((event) => (
            <EventItem key={event.id} event={event} onStartEdit={onStartEdit} onDelete={onDelete}
                       onLabelClick={onLabelClick} isFormVisible={isFormVisible}/>
        ))}
    </div>
}

export default EventsList;

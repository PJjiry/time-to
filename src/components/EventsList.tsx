import styles from "../styles/EventsList.module.css";
import {EventItemProps} from "../types";
import React from "react";
import EventItem from "./EventItem.tsx";


const EventsList: React.FC<{events:EventItemProps[], onStartEdit: (event: EventItemProps) => void;onDelete:(id:number)=>void, onLabelClick:(label:string)=>void, isFormVisible:boolean}> = ({events, onStartEdit, onDelete, onLabelClick, isFormVisible}) => {
    return <div className={styles.cardsContainer}>
        {events.map((event) => (
            <EventItem key={event.id} event={event} onStartEdit={onStartEdit} onDelete={onDelete} onLabelClick={onLabelClick} isFormVisible={isFormVisible} />
        ))}
    </div>
}

export default EventsList;

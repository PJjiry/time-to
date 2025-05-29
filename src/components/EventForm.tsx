import React, {useState, FormEvent} from "react";
import styles from "../styles/EventForm.module.css";
import { EventItem, Priority} from "../types";
import {generateRandomId, getNowForInput} from "../utils/utils.ts";
import {useEvents} from "../hooks/useEvents.ts";

const EventForm: React.FC = () => {
    const {eventToEdit:initialData, editEventHandler, addEventHandler, cancelHandler}=useEvents();

    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [datetime, setDatetime] = useState(initialData?.datetime || "");
    const [labelsInput, setLabelsInput] = useState(initialData?.labels?.join(" ") || "");
    const [priority, setPriority] = useState<Priority>(initialData?.priority || "medium");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const labels = labelsInput
            .split(" ")
            .map(label => label.trim())
            .filter(label => label.length > 0);

        if (initialData?.id) {
            const editedEvent: EventItem = {
                id: initialData.id,
                title,
                description,
                datetime,
                labels,
                priority,
            };
            editEventHandler(editedEvent);
        } else {
            const newEvent: EventItem = {
                id: generateRandomId(),
                title,
                description,
                datetime,
                labels,
                priority,
            };
            addEventHandler(newEvent);
        }
        cancelHandler();
    };

    return (
        <div className={styles.container}>
            <h2>{initialData ? "Edit Event" : "Add Event"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100}/>
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300}/>
                </label>
                <label>
                    Date and Time:
                    <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)}
                           required min={getNowForInput()}/>
                </label>
                <label>
                    Labels (separated by space):
                    <input value={labelsInput} onChange={(e) => setLabelsInput(e.target.value)} maxLength={150}/>
                </label>
                <label>
                    Priority:
                    <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </label>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.saveButton}>Save</button>
                    <button type="button" className={styles.cancelButton} onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
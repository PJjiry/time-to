import React, { useState, FormEvent } from "react";
import styles from "../styles/EventForm.module.css";
import {EventData, EventFormProps, Priority} from "../types";

const EventForm: React.FC<EventFormProps> = ({ initialData, onSave, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [datetime, setDatetime] = useState(initialData?.datetime || "");
    const [tags, setTags] = useState(initialData?.tags.join(" ") || "");
    const [priority, setPriority] = useState<Priority>(initialData?.priority || "medium");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newEvent: EventData = {
            id: initialData?.id || crypto.randomUUID(),
            title,
            description,
            datetime,
            tags: tags.trim().split(" ").filter(tag => tag !== ""),
            priority,
        };
        onSave(newEvent);
    };

    return (
        <div className={styles.container}>
            <h2>{initialData ? "Edit Event" : "Add Event"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Title:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={50}/>
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={150} />
                </label>
                <label>
                    Date and Time:
                    <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} required />
                </label>
                <label>
                    Tags (separated by space):
                    <input value={tags} onChange={(e) => setTags(e.target.value)} maxLength={100}/>
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
                    <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
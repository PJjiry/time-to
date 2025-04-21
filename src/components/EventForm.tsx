import React, {useState, FormEvent} from "react";
import styles from "../styles/EventForm.module.css";
import {EventFormProps, EventItemProps, Priority} from "../types";
import {generateRandomId, getNowForInput} from "../utils/utils.ts";

const EventForm: React.FC<EventFormProps> = ({initialData, onAdd, onEdit, onCancel}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [datetime, setDatetime] = useState(initialData?.datetime || "");
    const [labelsInput, setLabelsInput] = useState(initialData?.labels?.join(" ") || "");
    const [priority, setPriority] = useState<Priority>(initialData?.priority || "medium");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const labels = labelsInput
            .split(" ")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        if (initialData?.id) {
            const editedEvent: EventItemProps = {
                id: initialData.id,
                title,
                description,
                datetime,
                labels,
                priority,
            };

            onEdit(editedEvent);
        } else {
            const newEvent: EventItemProps = {
                id: generateRandomId(),
                title,
                description,
                datetime,
                labels,
                priority,
            };
            onAdd(newEvent);
        }

        onCancel();
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
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={150}/>
                </label>
                <label>
                    Date and Time:
                    <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)}
                           required min={getNowForInput()}/>
                </label>
                <label>
                    Tags (separated by space):
                    <input value={labelsInput} onChange={(e) => setLabelsInput(e.target.value)} maxLength={100}/>
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
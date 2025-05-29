import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from '../styles/EventDetailPage.module.css';
import {useEvents} from '../hooks/useEvents';
import {getLabelColor} from "../utils/utils.ts";
import {Spinner} from "../components/Spinner.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";

const EventDetailPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();
    const {events, handleDeleteEvent, loading, error} = useEvents();

    const event = events.find(e => e.id === id);

    const handleEdit = () => {
        navigate(`/edit-event/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            handleDeleteEvent(id);
            navigate('/');
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {loading && <Spinner/>}
                {error && <ErrorMessage message={error}/>}
                {!loading && !error && event && <>
                    <h1>{event.title}</h1>
                    <div className={styles.details}>
                        <div className={styles.datetime}>
                            <strong>Date and Time:</strong>
                            <span>{new Date(event.datetime).toLocaleString()}</span>
                        </div>
                        <div className={styles.priority}>
                            <strong>Priority:</strong>
                            <span className={styles[event.priority]}>{event.priority}</span>
                        </div>
                        {event.description && (
                            <div className={styles.description}>
                                <strong>Description:</strong>
                                <p>{event.description}</p>
                            </div>
                        )}
                        {event.labels && event.labels.length > 0 && (
                            <div className={styles.labels}>
                                <strong>Labels:</strong>
                                <div className={styles.labelsList}>
                                    {event.labels.map((label, index) => (
                                        <span key={index} className={styles.label}
                                              style={{backgroundColor: getLabelColor(label)}}>{label}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.actions}>
                        <button onClick={handleEdit} className={styles.editButton}>
                            Edit Event
                        </button>
                        <button onClick={handleDelete} className={styles.deleteButton}>
                            Delete Event
                        </button>
                        <button onClick={() => navigate('/')} className={styles.backButton}>
                            Back to Events
                        </button>
                    </div>
                </>}
            </div>
        </main>
    );
};

export default EventDetailPage;

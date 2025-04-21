import styles from "./App.module.css";
import Header from "./components/Header.tsx";
import React, {useEffect, useState} from "react";
import EventsList from "./components/EventsList.tsx";
import {EventItemProps} from "./types";
import EventForm from "./components/EventForm.tsx";
import {getTimeLeftFromInput} from "./utils/utils.ts";

const App: React.FC = () => {
    const [events, setEvents] = useState<EventItemProps[]>(() => {
        const stored = localStorage.getItem("my-events");
        return stored ? JSON.parse(stored) :[];
    });
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [eventToEdit, setEventToEdit] = useState<EventItemProps | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("my-events");
        if (stored) {
            setEvents(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("my-events", JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        const interval = setInterval(() => {
            setEvents(prevEvents =>
                prevEvents.map(event => {
                    const timeLeft = getTimeLeftFromInput(event.datetime);
                    return { ...event, timeLeft };
                })
            );
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const addEventHandler = (event: EventItemProps) => {
        setEvents((prevEvents) => {
            return [...prevEvents, event]
        })
    }

    const startEditEventHandler = (event: EventItemProps) => {
        setEventToEdit(event);
        setFormIsVisible(true);
    };

    const editEventHandler = (editedEvent: EventItemProps) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === editedEvent.id ? editedEvent : event
            )
        );
        setFormIsVisible(false);
        setEventToEdit(null);
    };

    const handleDeleteEvent = (id: number) => {
        setEvents((prevEvents) => {
            return prevEvents.filter((event) => event.id !== id)
        })
    }

    const handleLabelClick = (label: string) => {
        setSelectedLabel(prev => (prev === label ? null : label));
    };

    const now = new Date();
    const notPassEvents = events.filter(event => new Date(event.datetime) > now);

    const filteredEventsByLabel = selectedLabel
        ? notPassEvents.filter(event => event.labels?.includes(selectedLabel))
        : notPassEvents;

    const sortedEvents = [...filteredEventsByLabel].sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Time to ... app</h1>
            <Header eventsLength={filteredEventsByLabel.length} onOpenForm={() => setFormIsVisible((prevIsVisible) => !prevIsVisible)}
                    buttonIsVisible={!formIsVisible}/>
            <main className={styles.main}>
                {events.length === 0 ? <div className={styles.noEvents}>No events added!!</div> :
                    <EventsList isFormVisible={formIsVisible} onLabelClick={handleLabelClick} events={sortedEvents} onStartEdit={startEditEventHandler} onDelete={handleDeleteEvent}/>}
                {formIsVisible &&
                    <EventForm initialData={eventToEdit}
                               onCancel={() => {
                                   setFormIsVisible(false)
                                   setEventToEdit(null);
                               }}
                               onAdd={addEventHandler}
                               onEdit={editEventHandler}/>}
            </main>
        </div>
    );
}
export default App;
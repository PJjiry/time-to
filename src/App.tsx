import styles from "./App.module.css";
import Header from "./components/Header.tsx";
import React, {useEffect, useState} from "react";
import EventsList from "./components/EventsList.tsx";
import {EventItemProps} from "./types";
import EventForm from "./components/EventForm.tsx";
import {getTimeLeftFromInput} from "./utils/utils.ts";

const DummyEvents: EventItemProps[] = [
    {
        id: 1,
        title: "Trip to Brno",
        description: "We are going from the main train station",
        datetime: "2025-04-23T14:30",
        labels: ["Holidays", "Personal"],
        priority: "medium",
    },
    {
        id: 2,
        title: "Deadline of homework",
        description: "The homework for software development lesson",
        datetime: "2025-04-28T15:30",
        labels: ["School", "Personal"],
        priority: "high",
    },
    {
        id: 3,
        title: "Release of the project",
        description: "The first version of the application is available to customer",
        datetime: "2025-05-03T11:00",
        labels: ["IT", "Work"],
        priority: "high",
    },
];

const App: React.FC = () => {
    const [events, setEvents] = useState<EventItemProps[]>(DummyEvents);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [eventToEdit, setEventToEdit] = useState<EventItemProps | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

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
                    <EventsList onLabelClick={handleLabelClick} events={sortedEvents} onStartEdit={startEditEventHandler} onDelete={handleDeleteEvent}/>}
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
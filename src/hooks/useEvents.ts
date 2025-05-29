import {useEffect, useState} from "react";
import {EventItem} from "../types";
import {getTimeLeftFromInput} from "../utils/utils.ts";

export const useEvents = () => {
    const [events, setEvents] = useState<EventItem[]>(() => {
        const storedEvents = localStorage.getItem("my-events");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [eventToEdit, setEventToEdit] = useState<EventItem | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    useEffect(() => {
        const storedEvents = localStorage.getItem("my-events");
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
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
                    return {...event, timeLeft};
                })
            );
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const addEventHandler = (event: EventItem) => {
        setEvents((prevEvents) => {
            return [...prevEvents, event]
        })
    }

    const startEditEventHandler = (event: EventItem) => {
        setEventToEdit(event);
        setFormIsVisible(true);
    };

    const editEventHandler = (editedEvent: EventItem) => {
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

    const cancelHandler = () => {
        setFormIsVisible(false)
        setEventToEdit(null);
    }

    const now = new Date();
    const notPassEvents = events.filter(event => new Date(event.datetime) > now);

    const filteredEventsByLabel = selectedLabel
        ? notPassEvents.filter(event => event.labels?.includes(selectedLabel))
        : notPassEvents;

    const sortedEvents = [...filteredEventsByLabel].sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
    return {
        filteredEventsByLabel,
        setFormIsVisible,
        formIsVisible,
        events,
        handleLabelClick,
        sortedEvents,
        startEditEventHandler,
        editEventHandler,
        handleDeleteEvent,
        cancelHandler,
        addEventHandler,
        eventToEdit
    }
}
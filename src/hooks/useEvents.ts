import {useEffect, useState} from "react";
import {EventItem} from "../types";
import {getTimeLeftFromInput} from "../utils/utils.ts";

export const useEvents = () => {
    const [events, setEvents] = useState<EventItem[]>(() => {
        const storedEvents = localStorage.getItem("my-events");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
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
    };

    const editEventHandler = (editedEvent: EventItem) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === editedEvent.id ? editedEvent : event
            )
        );
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

    return{
        events,
        eventToEdit,
        selectedLabel,
        addEventHandler,
        startEditEventHandler,
        editEventHandler,
        handleDeleteEvent,
        handleLabelClick,
    }
}
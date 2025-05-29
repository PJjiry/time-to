import {useState, useEffect, useCallback} from 'react';
import {EventItem} from '../types';
import {firebaseAPI} from '../../firebaseAPI';
import {getTimeLeftFromInput} from '../utils/utils.ts';

export const useEvents = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const fetchedEvents = await firebaseAPI.fetchEvents();
                setEvents(fetchedEvents);
                setError(null);
            } catch (err) {
                setError('Failed to fetch events');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setEvents(prevEvents =>
                prevEvents.map(event => ({
                    ...event,
                    timeLeft: getTimeLeftFromInput(event.datetime)
                }))
            );
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const addEventHandler = async (event: EventItem) => {
        try {
            setLoading(true);
            const newEventId = await firebaseAPI.addEvent(event);
            const newEvent = {...event, id: newEventId};
            setEvents(prevEvents => [...prevEvents, newEvent]);
            return newEventId;
        } catch (err) {
            setError('Failed to add event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editEventHandler = async (editedEvent: EventItem) => {
        try {
            setLoading(true);
            await firebaseAPI.updateEvent(editedEvent);
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === editedEvent.id ? editedEvent : event
                )
            );
        } catch (err) {
            setError('Failed to update event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: number) => {
        try {
            setLoading(true);
            await firebaseAPI.deleteEvent(id);
            setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
        } catch (err) {
            setError('Failed to delete event');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLabelClick = (label: string) => {
        setSelectedLabel(prev => (prev === label ? null : label));
    };

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const searchedEvents = events.filter(event => {
        return searchQuery
            ? event.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
    });

    return {
        events: searchedEvents,
        selectedLabel,
        loading,
        error,
        addEventHandler,
        editEventHandler,
        handleDeleteEvent,
        handleLabelClick,
        handleSearch,
        searchQuery,
    };
};
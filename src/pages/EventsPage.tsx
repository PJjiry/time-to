import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";
import Header from "../components/Header.tsx";
import EventsList from "../components/EventsList.tsx";

const EventsPage = () => {
    const {events,selectedLabel, handleLabelClick, startEditEventHandler, handleDeleteEvent}= useEvents();

    const now = new Date();
    const notPassEvents = events.filter(event => new Date(event.datetime) > now);

    const filteredEventsByLabel = selectedLabel
        ? notPassEvents.filter(event => event.labels?.includes(selectedLabel))
        : notPassEvents;

    const sortedEvents = [...filteredEventsByLabel].sort((a, b) =>
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    return (
        <main className={styles.main}>
            <h1 className={styles.mainTitle}>Time to ... app</h1>
            <Header eventsLength={filteredEventsByLabel.length}/>
            <section className={styles.main}>
                {events.length === 0 ? <div className={styles.noEvents}>No events added!!</div> :
                    <EventsList onLabelClick={handleLabelClick} events={sortedEvents}
                                onStartEdit={startEditEventHandler} onDelete={handleDeleteEvent}/>}
            </section>
        </main>
    );
}
export default EventsPage;
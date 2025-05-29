import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";
import Header from "../components/Header.tsx";
import EventsList from "../components/EventsList.tsx";
import SearchBar from "../components/SearchBar.tsx";

const EventsPage = () => {
    const {events, selectedLabel, handleLabelClick, handleSearch, searchQuery, loading, error} = useEvents();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        <div>Error: {error}</div>;   
    }

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
                <div>
                    <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch}/>
                </div>
                {events.length === 0 ? <div className={styles.noEvents}>No events found!!</div> :
                    <EventsList onLabelClick={handleLabelClick} events={sortedEvents}/>}
            </section>
        </main>
    );
}
export default EventsPage;
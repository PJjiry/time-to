import EventForm from "../components/EventForm.tsx";
import styles from "../styles/EventsPage.module.css";
import {Spinner} from "../components/Spinner.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";
import {useEvents} from "../hooks/useEvents.ts";

export const NewEventPage = () => {
    const {loading, error} = useEvents();
    return (
        <main className={styles.main}>
            {loading && <Spinner/>}
            {error && <ErrorMessage message={error}/>}
            {!loading && !error && <EventForm/>}
        </main>
    )
}
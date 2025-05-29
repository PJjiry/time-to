import EventForm from "../components/EventForm.tsx";
import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";
import {useParams} from "react-router-dom";
import {Spinner} from "../components/Spinner.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";

export const EditDetailPage = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const {events, loading, error} = useEvents();
    const eventToEdit = events.find(event => event.id === id);

    return (
        <main className={styles.main}>
            {loading && <Spinner/>}
            {error && <ErrorMessage message={error}/>}
            {!loading && !error && eventToEdit && <EventForm initialData={eventToEdit}/>}
        </main>
    )
}
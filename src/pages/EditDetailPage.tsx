import EventForm from "../components/EventForm.tsx";
import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";
import {useParams} from "react-router-dom";

export const EditDetailPage = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const { events } = useEvents();
    const eventToEdit = events.find(event => event.id === id);

    if (!eventToEdit) {
        return <div>Event not found</div>;
    }

    return(
        <main className={styles.main}>
            <EventForm initialData={eventToEdit}/>
        </main>
    )
}
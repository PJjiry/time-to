import EventForm from "../components/EventForm.tsx";
import styles from "../styles/EventsPage.module.css";

export const NewEventPage = () => {
    return (
        <main className={styles.main}>
            <EventForm/>
        </main>
    )
}
import EventForm from "../components/EventForm.tsx";
import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";

export const NewEventPage = () => {
    const {addEventHandler}=useEvents();

  return(
      <main className={styles.main}>
      <EventForm onAdd={addEventHandler}/>
      </main>
  )
}
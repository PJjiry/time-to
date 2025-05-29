import EventForm from "../components/EventForm.tsx";
import {useEvents} from "../hooks/useEvents.ts";
import styles from "../styles/EventsPage.module.css";

export const NewEventPage = () => {
    const {eventToEdit,addEventHandler,editEventHandler}=useEvents();

  return(
      <main className={styles.main}>
      <EventForm initialData={eventToEdit}
                 onAdd={addEventHandler}
                 onEdit={editEventHandler}/>
      </main>
  )
}
import styles from "./App.module.css";
import Header from "./components/Header.tsx";
import React, {useState} from "react";
import EventsList from "./components/EventsList.tsx";
import { EventItemProps} from "./types";
import EventForm from "./components/EventForm.tsx";

const DummyEvents: EventItemProps[] = [
    {
        id: 1,
        title: "Trip to Brno",
        description: "We are going from the main train station",
        timeLeft: "2 days and 3 hours left",
        labels: ["Holidays", "Personal"],
        priority: "medium",
    },
    {
        id: 2,
        title: "Deadline of homework",
        description: "The homework for software development lesson",
        timeLeft: "7 days and 5 hours left",
        labels: ["School", "Personal"],
        priority: "high",
    },
    {
        id: 3,
        title: "Release of the project",
        description: "The first version of the application is available to customer",
        timeLeft: "14 days and 3 hours left",
        labels: ["IT", "Work"],
        priority: "high",
    },
];

const App:React.FC = () => {
    const [events] = useState<EventItemProps[]>(DummyEvents);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Time to ... app</h1>
            <Header eventsLength={events.length} onOpenForm={() => setFormIsVisible((prevIsVisible)=>!prevIsVisible)} buttonIsVisible={!formIsVisible} />
            <main className={styles.main}>
                <EventsList events={events} />
                {formIsVisible && <EventForm onCancel={() => setFormIsVisible(false)}/>}
            </main>
        </div>
    );
}
export default App;
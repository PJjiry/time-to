import styles from "./styles/App.module.css";
import Header from "./components/Header.tsx";
import React, {useEffect, useState} from "react";
import EventsList from "./components/EventsList.tsx";
import {EventItem} from "./types";
import EventForm from "./components/EventForm.tsx";
import {getTimeLeftFromInput} from "./utils/utils.ts";
import {useEvents} from "./hooks/useEvents.ts";

const App: React.FC = () => {
   const {formIsVisible, events,}= useEvents();

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Time to ... app</h1>
            <Header/>
            <main className={styles.main}>
                {events.length === 0 ? <div className={styles.noEvents}>No events added!!</div> :
                    <EventsList />}
                {formIsVisible &&
                    <EventForm />}
            </main>
        </div>
    );
}
export default App;
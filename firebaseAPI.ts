import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    where
} from 'firebase/firestore';
import {db} from './firebase';
import {EventItem} from './src/types';
import {generateRandomId} from './src/utils/utils.ts';

const EVENTS_COLLECTION = 'events';

export const firebaseAPI = {
    async fetchEvents(): Promise<EventItem[]> {
        try {
            const eventsCollection = collection(db, EVENTS_COLLECTION);
            const eventsQuery = query(eventsCollection, orderBy('datetime', 'asc'));
            const querySnapshot = await getDocs(eventsQuery);

            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                const localDate = new Date(data.datetime.toDate().getTime() + (2 * 60 * 60 * 1000));//add 2 hours to UTC time to get local time
                return {
                    ...data,
                    id: Number(data.id),
                    datetime: localDate.toISOString().slice(0, 16),
                } as EventItem;
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async addEvent(event: Omit<EventItem, 'id'>): Promise<number> {
        try {
            const newId = generateRandomId();
            await addDoc(collection(db, EVENTS_COLLECTION), {
                ...event,
                id: newId,
                datetime: Timestamp.fromDate(new Date(event.datetime)),
                createdAt: Timestamp.now()
            });
            return newId;
        } catch (error) {
            console.error('Error adding event:', error);
            throw error;
        }
    },

    async updateEvent(event: EventItem): Promise<void> {
        try {
            const eventsRef = collection(db, EVENTS_COLLECTION);
            const q = query(eventsRef, where('id', '==', event.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = doc(db, EVENTS_COLLECTION, querySnapshot.docs[0].id);
                const eventData = {
                    ...event,
                    datetime: Timestamp.fromDate(new Date(event.datetime)),
                    updatedAt: Timestamp.now()
                };
                await updateDoc(docRef, eventData);
            }
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    },

    async deleteEvent(id: number): Promise<void> {
        try {
            const eventsRef = collection(db, EVENTS_COLLECTION);
            const q = query(eventsRef, where('id', '==', id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = doc(db, EVENTS_COLLECTION, querySnapshot.docs[0].id);
                await deleteDoc(docRef);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
};
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

            // @ts-ignore
            return querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: Number(doc.data().id),
                datetime: doc.data().datetime.toDate().toISOString().slice(0, 16),
            }));
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async addEvent(event: Omit<EventItem, 'id'>): Promise<number> {
        try {
            const newId = generateRandomId(); // Use your existing random ID generator
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
            } else {
                throw new Error('Event not found');
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
            } else {
                throw new Error('Event not found');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
};
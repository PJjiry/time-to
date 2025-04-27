# Time to ... app

## Project Description
**Time to ...** is a web application for managing upcoming events with a live countdown.  
Users can:
- Add new events with a title, description, date/time, and priority.
- Edit existing events.
- Filter events by labels (by clicking on a label).
- Events automatically update every minute to keep countdowns accurate.
- All events are saved in **LocalStorage** so they persist even after refreshing the page.

The app is fully responsive — on smaller screens, either the event list or the event form is displayed at a time for better usability.

## Folder and Component Structure
```/src
├── /components
│    ├── EventForm.tsx        // Form for adding and editing events
│    ├── EventsList.tsx       // List of all events
│    ├── EventItem.tsx        // Single event displayed as a card
│    └── Header.tsx           // Top bar with button for adding new events
│
├── /styles
│    ├── App.module.css       // Main layout styling
│    ├── EventForm.module.css // Styling for the form
│    ├── EventItem.module.css // Styling for individual event cards
│    ├── EventList.module.css // Styling for event list
│    ├── Header.module.css    // Styling for header component
│
├── /types
│    ├── index.ts             // Type definitions for events and props
├── /utils
│    ├── utils.ts             // Helper functions (ID generation, time left calculation, etc.)
│
├── App.tsx                   // Main application component with most of thel logic
└── main.tsx                  // Application entry point (Vite)
```
## How to Run the Project Locally

**Clone the repository**:

```bash
git clone https://github.com/PJjiry/time-to.git
cd time-to-app
npm install
npm run dev
```
**Visit the app in your browser:
http://localhost:5173**
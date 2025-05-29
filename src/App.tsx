
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import EventsPage from "./pages/EventsPage.tsx";
import {NewEventPage} from "./pages/NewEventPage.tsx";
import EventDetailPage from "./pages/EventDetailPage.tsx";

const App: React.FC = () => {
   return (<BrowserRouter>
       <Routes>
           <Route path='/time-to' element={<EventsPage />}/>
           <Route path='time-to/new-event' element={<NewEventPage />} />
           <Route path='time-to/event/:id' element={<EventDetailPage />} />
           <Route path="*" element={<div>Not found</div>} />

       </Routes>
   </BrowserRouter>)
}
export default App;
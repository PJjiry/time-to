import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import EventsPage from "./pages/EventsPage.tsx";
import {NewEventPage} from "./pages/NewEventPage.tsx";
import EventDetailPage from "./pages/EventDetailPage.tsx";
import {EditDetailPage} from "./pages/EditDetailPage.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EventsPage/>}/>
                <Route path='new-event' element={<NewEventPage/>}/>
                <Route path='event/:id' element={<EventDetailPage/>}/>
                <Route path='edit-event/:id' element={<EditDetailPage/>}/>
                <Route path="*" element={<div>Not found</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
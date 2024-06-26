import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"
import EventCreate from "../pages/event/Create.jsx"
import Event from "../pages/event/Event.jsx"
import Profile from "../pages/profile/Profile.jsx"

function RoutesIndex() {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/create" element={<EventCreate />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}

export default RoutesIndex

import React from "react";
import { Routes, Route } from "react-router-dom";
import AppointmentGrid from "./components/AppointmentGrid";
import CalendarView from "./components/CalendarView";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route exact path="/" Component={AppointmentGrid} />
        <Route path="/calendar" Component={CalendarView} />
      </Routes>
    </>
  );
}

export default App;
